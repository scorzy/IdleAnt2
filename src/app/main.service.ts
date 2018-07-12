import { Injectable, EventEmitter, Inject } from "@angular/core";
import { Game } from "./model/game";
import { OptionsService } from "./options.service";
import * as LZString from "lz-string";
import { ToastrService } from "ngx-toastr";
import { World } from "./model/world";
import { DOCUMENT } from "@angular/platform-browser";

const GAME_VERSION = 0;

@Injectable({
  providedIn: "root"
})
export class MainService {
  game: Game;
  last: number;

  updateEmitter: EventEmitter<number> = new EventEmitter<number>();
  researchEmitter: EventEmitter<string> = new EventEmitter<string>();
  worldEmitter: EventEmitter<World> = new EventEmitter<World>();

  themeClarity: HTMLLinkElement;
  themePrime: HTMLLinkElement;
  themeMy: HTMLLinkElement;

  constructor(
    public options: OptionsService,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.themeClarity = this.document.createElement("link");
    this.themeClarity.rel = "stylesheet";
    this.themeClarity.type = "text/css";
    this.document.querySelector("head").appendChild(this.themeClarity);

    this.themePrime = this.document.createElement("link");
    this.themePrime.rel = "stylesheet";
    this.themePrime.type = "text/css";
    this.document.querySelector("head").appendChild(this.themePrime);

    this.themeMy = this.document.createElement("link");
    this.themeMy.rel = "stylesheet";
    this.themeMy.type = "text/css";
    this.document.querySelector("head").appendChild(this.themeMy);

    this.setTheme();

    this.game = new Game(this.updateEmitter, this.researchEmitter);
    this.last = Date.now();
    setInterval(this.update.bind(this), 200);
  }
  update() {
    const now = Date.now();
    const diff = now - this.last;

    this.game.updateWithTime(diff);
    this.game.postUpdate();
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
      return LZString.compressToBase64(JSON.stringify(save));
    } catch (ex) {
      this.toastr.error(
        ex && ex.message ? ex.message : "unknow error",
        "Save Error"
      );
    }
  }
  save(autosave = false) {
    try {
      const save = this.getSave();
      if (!!save) {
        localStorage.setItem("save", save);
        if (!autosave || this.options.autosaveNotification)
          this.toastr.success("", "Game Saved");
      } else this.toastr.error("Unknow error 1", "Save Error");
    } catch (ex) {
      this.toastr.error(
        ex && ex.message ? ex.message : "unknow error",
        "Save Error"
      );
    }
  }
  import(raw: string, first = false): boolean {
    try {
      if (!raw) {
        if (!first)
          setTimeout(() => this.toastr.error("No save foud", "Not Loaded"), 0);
        return false;
      }
      const json = LZString.decompressFromBase64(raw);
      const data = JSON.parse(json);
      if (!data.m) {
        setTimeout(
          () => this.toastr.error("Save is not valid", "Not Loaded"),
          0
        );
        return false;
      }
      this.game = null;
      this.game = new Game(this.updateEmitter, this.researchEmitter);
      if (!!data.o) this.options.restore(data.o);
      this.setTheme();
      this.last = data.time;
      this.game.restore(data.m);
      setTimeout(() => this.toastr.success("", "Game Loaded"), 0);
    } catch (ex) {
      setTimeout(
        () =>
          this.toastr.error(
            ex && ex.message ? ex.message : "unknow error",
            "Load Error"
          ),
        0
      );
    }
  }
  load(first = false) {
    try {
      this.import(localStorage.getItem("save"), first);
    } catch (ex) {
      setTimeout(
        () =>
          this.toastr.error(
            ex && ex.message ? ex.message : "unknow error",
            "Load Error"
          ),
        0
      );
    }
  }
  clear() {
    localStorage.removeItem("save");
    window.location.reload();
  }
  setTheme() {
    this.themeClarity.href = this.options.dark
      ? "/clr-ui-dark.min.css"
      : "/clr-ui.min.css";
    this.themePrime.href =
      (this.options.dark ? "/start" : "/start") + "/theme.css";
    this.themeMy.href =
      "/assets/" + (this.options.dark ? "dark.css" : "light.css");
  }
}
