import { EventEmitter, Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import * as LZString from "lz-string";
import { ToastrService } from "ngx-toastr";
import { EndInPipe } from "./end-in.pipe";
import { Game } from "./model/game";
import { MasteryTypes } from "./model/masteries/mastery";
import { World } from "./model/world";
import { OptionsService } from "./options.service";

declare let kongregateAPI;
declare let PlayFab;
declare let $;

const GAME_VERSION = 0;
const H8 = 8 * 3600 * 1000;
const H1 = 3600 * 1000;
const SAVE_INTERVAL = 5 * 60 * 1000;
const UP_INTERVAL = 250; // 4 fps

@Injectable({
  providedIn: "root"
})
export class MainService {
  game: Game;
  last: number;
  lastSave: Date;
  show = false;
  kongregate: any;

  updateEmitter: EventEmitter<number> = new EventEmitter<number>();
  researchEmitter: EventEmitter<string> = new EventEmitter<string>();
  worldEmitter: EventEmitter<World> = new EventEmitter<World>();
  unlockGroupEmiter: EventEmitter<number> = new EventEmitter<number>();
  efficiencyEmitter: EventEmitter<number> = new EventEmitter<number>();
  saveEmitter: EventEmitter<Date> = new EventEmitter<Date>();
  selectedEmitter: EventEmitter<number> = new EventEmitter<number>();

  endInPipe: EndInPipe;

  themeClarity: HTMLLinkElement;
  // themePrime: HTMLLinkElement;
  themeMy: HTMLLinkElement;

  //#region Unit Tas
  lastTab = 0;
  overviewTaActive = false;
  prestigeTaActive = false;
  //#endregion

  readonly titleId = "E86B";
  playFabId = -1;
  testing = false;
  playFabLogged = false;

  constructor(
    public options: OptionsService,
    public toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.endInPipe = new EndInPipe(this.options);

    this.themeClarity = this.document.createElement("link");
    this.themeClarity.rel = "stylesheet";
    this.themeClarity.type = "text/css";
    this.document.querySelector("head").appendChild(this.themeClarity);

    this.themeMy = this.document.createElement("link");
    this.themeMy.rel = "stylesheet";
    this.themeMy.type = "text/css";
    this.document.querySelector("head").appendChild(this.themeMy);

    this.last = Date.now();

    this.load(true);

    if (!this.game) {
      this.setTheme();
      this.game = new Game(this);
    }

    //  Kong Api
    const url =
      window.location !== window.parent.location
        ? document.referrer
        : document.location.href;

    if (url.includes("kongregate") && typeof kongregateAPI !== "undefined") {
      kongregateAPI.loadAPI(() => {
        this.kongregate = kongregateAPI.getAPI();
        console.log("KongregateAPI Loaded");

        setTimeout(() => {
          try {
            console.log("Kongregate build");
            this.sendKong();
          } catch (e) {
            console.log("Error: " + e.message);
          }
        }, 5 * 1000);
      });
    }
    //else console.log("Github build");
  }
  start() {
    this.show = true;
    setInterval(this.update.bind(this), UP_INTERVAL);
    setInterval(this.save.bind(this, true), SAVE_INTERVAL);
  }
  update() {
    const now = Date.now();
    let diff = now - this.last;

    if (diff > H1) {
      let bonus = 0;
      if (diff > H8) {
        bonus =
          (diff *
            30 *
            this.game.allMateries.getSum(MasteryTypes.MORE_IDLE_8H)) /
          100;
      }
      this.toastr.info(
        bonus > 0
          ? "Bonus: " + distanceInWordsToNow(new Date(Date.now() + bonus))
          : "",
        "You where offline for: " +
          distanceInWordsToNow(new Date(Date.now() + diff))
      );
      diff = diff + bonus;
    }

    this.game.updateWithTime(diff);

    this.game.postUpdate(diff);
    this.last = now;
    this.updateEmitter.emit(diff);
  }

  getSave(): string {
    try {
      const save: any = {};
      save.m = this.game.getSave();
      save.o = this.options.getSave();
      save.time = this.last;
      save.ver = GAME_VERSION;
      // console.log(JSON.stringify(save));
      return LZString.compressToBase64(JSON.stringify(save));
    } catch (ex) {
      this.toastr.error(
        ex && ex.message ? ex.message : "unknown error",
        "Save Error"
      );
    }
  }
  save(autosave = false) {
    try {
      const save = this.getSave();
      if (!!save) {
        localStorage.setItem("save", save);
        if (!autosave || this.options.autosaveNotification) {
          this.toastr.success("", "Game Saved");
          console.log("Game Saved");
          this.lastSave = new Date();
          this.saveEmitter.emit(this.lastSave);
        }
      } else this.toastr.error("Unknow error 1", "Save Error");
    } catch (ex) {
      this.toastr.error(
        ex && ex.message ? ex.message : "unknown error",
        "Save Error"
      );
    }
  }
  import(raw: string, first = false, playFab = false): boolean {
    try {
      if (raw === "TEST") {
        this.testing = true;
        return;
      }
    } catch (e) {}

    try {
      if (!raw) {
        if (!first) {
          setTimeout(() => this.toastr.error("No save found", "Not Loaded"), 0);
        }
        return false;
      }
      const json = LZString.decompressFromBase64(raw);
      const data = JSON.parse(json);
      if (!("m" in data)) {
        setTimeout(
          () => this.toastr.error("Save is not valid", "Not Loaded"),
          0
        );
        return false;
      }
      this.game = null;
      this.game = new Game(this);
      if (!!data.o) this.options.restore(data.o);
      this.setTheme();
      this.last = data.time;
      this.lastSave = new Date(this.last);
      this.game.restore(data.m);
      setTimeout(() => this.toastr.success("", "Game Loaded"), 0);
      return true;
    } catch (ex) {
      // tslint:disable-next-line:no-console
      console.log(ex);
      setTimeout(
        () =>
          this.toastr.error(
            ex && ex.message ? ex.message : "unknown error",
            "Load Error"
          ),
        0
      );
      return false;
    }
  }
  load(first = false): boolean {
    try {
      return this.import(localStorage.getItem("save"), first);
    } catch (ex) {
      setTimeout(
        () =>
          this.toastr.error(
            ex && ex.message ? ex.message : "unknown error",
            "Load Error"
          ),
        0
      );
      return false;
    }
  }
  clear() {
    localStorage.removeItem("save");
    window.location.reload();
  }
  setTheme() {
    const themeClarity = this.options.dark
      ? "clr-ui-dark.min.css"
      : "clr-ui.min.css";
    if (this.themeClarity.href !== themeClarity) {
      this.themeClarity.href = themeClarity;
    }

    const myTheme = "assets/" + (this.options.dark ? "dark.css" : "light.css");
    if (myTheme !== this.themeMy.href) {
      this.themeMy.href =
        "assets/" + (this.options.dark ? "dark.css" : "light.css");
    }
  }
  sendKong() {
    try {
      if (this.kongregate) {
        this.kongregate.stats.submit(
          "LogExperience",
          this.game.experience.quantity.log10()
        );
        this.kongregate.stats.submit(
          "Mastery",
          this.game.allMateries.totalEarned
        );
        this.kongregate.stats.submit(
          "WorldCompleted",
          this.game.stats.completedWorld.toNumber()
        );
        this.kongregate.stats.submit(
          "LogBestExp",
          this.game.stats.bestExpS.log10()
        );
      }
    } catch (e) {
      console.log("Kongregate Stats error: " + e.message);
    }
  }

  //#region PlayFab
  playFabLogin() {
    if (!this.kongregate) {
      this.toastr.error(
        "You need to be logged in to Kongregate.",
        "PlayFab error"
      );
      return;
    }

    try {
      const authTicket = this.kongregate.services.getGameAuthToken();
      const requestData = {
        TitleId: this.titleId,
        KongregateId: this.kongregate.services.getUserId(),
        AuthTicket: authTicket,
        CreateAccount: true
      };
      try {
        PlayFab.ClientApi.LoginWithKongregate(
          requestData,
          this.playFabLoginCallback.bind(this)
        );
      } catch (e) {
        console.log("Unable to send login request to PlayFab.");
        this.toastr.error("Unable to send login request to PlayFab.");
      }
    } catch (e) {
      console.log(e);
    }
  }
  playFabLoginCallback(data, error) {
    if (error) {
      console.log(error.errorMessage);
      this.toastr.error(
        "You need to be logged in to Kongregate.",
        "Couldn't log in to PlayFab Cloud"
      );
      return;
    }
    if (data) {
      this.playFabId = data.data.PlayFabId;
      PlayFab.settings.titleId = "E86B";
      this.playFabLogged = true;
      this.saveEmitter.emit();
      console.log("Logged in to playFab");
      this.toastr.info("Logged in to PlayFab");
    }
  }
  savePlayFab() {
    if (
      !this.playFabId ||
      typeof PlayFab === "undefined" ||
      typeof PlayFab.ClientApi === "undefined"
    ) {
      return false;
    }

    // Cut compressed object into strings of 10,000 bytes for PlayFab
    const chunks = this.getSave().match(/.{1,10000}/g);
    if (chunks.length > 10) {
      this.toastr.error("size limit exceeded", "Error saving to cloud");
    }
    // convert array into object with numbers as keys
    // const data = $.extend({}, chunks);
    const data: any = {};
    for (let i = 0; i < chunks.length; i++) data[i] = chunks[i];

    const requestData = {
      TitleId: this.titleId,
      PlayFabId: this.playFabId,
      Data: data
    };
    try {
      PlayFab.ClientApi.UpdateUserData(
        requestData,
        this.saveToPlayFabCallback.bind(this)
      );
    } catch (e) {
      console.log(e);
    }
  }
  saveToPlayFabCallback(data, error) {
    if (error) {
      console.log(error);
      return false;
    }
    if (data) {
      console.log("Game Saved!");
      this.toastr.success("Game saved to PlayFab");
      return true;
    }
  }
  loadPlayFab() {
    if (
      !this.playFabId ||
      typeof PlayFab === "undefined" ||
      typeof PlayFab.ClientApi === "undefined"
    ) {
      console.log(this.playFabId, PlayFab);
      return false;
    }
    const requestData = {
      Keys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "save"],
      PlayFabId: this.playFabId
    };
    try {
      console.log("attempting to send load request");
      PlayFab.ClientApi.GetUserData(
        requestData,
        this.loadFromPlayFabCallback.bind(this)
      );
      console.log("sent load request");
    } catch (e) {
      console.log(e);
    }
  }
  loadFromPlayFabCallback(data, error) {
    try {
      console.log("loading callback fired");
      // console.log(data, error);
      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        if (data.data.Data) {
          const raw = Object.values(data.data.Data)
            .map((val: any) => {
              return val.Value;
            })
            .join("");
          console.log(raw);
          this.import(raw, false, true);
        }
      }
    } catch (e) {
      console.log(e);
      this.toastr.error("PlayFab Load error");
    }
  }
  //#endregion
}
