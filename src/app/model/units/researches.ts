import { EventEmitter } from "@angular/core";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { Research } from "../research";

export class Researches {
  researches = new Array<Research>();
  toDo: Research[];
  done: Research[];

  team1: Research;
  team2: Research;
  twin: Research;

  harvesting: Research;

  travel: Research;

  free4hWarp: Research;

  /**
   *  mastery, a special research
   *  never reset
   */
  mastery: Research;

  constructor(public researchEmitter: EventEmitter<string>) {}

  declareStuff(): void {
    this.team1 = new Research("team1", this);
    this.team2 = new Research("team2", this);
    this.twin = new Research("twin", this);
    this.travel = new Research("travel", this);
    this.mastery = new Research("mastery", this);
    this.harvesting = new Research("harv", this, true);
    this.free4hWarp = new Research("m4hWarp", this);

    this.team1.unlocked = true;
    this.reloadLists();
  }
  setRelations(science: FullUnit, game: Game): void {
    this.team1.genPrice(new Decimal(100), science);
    this.team2.genPrice(new Decimal(1e3), science);
    this.twin.genPrice(new Decimal(1e5), science);
    this.travel.genPrice(new Decimal(1e6), science);
    this.mastery.genPrice(new Decimal(1e20), science);
    this.harvesting.prices = game.genSciencePrice(1e3, 1e3);
    this.free4hWarp.prices = game.genSciencePrice(1);

    this.team1.toUnlock = [this.team2];
    this.team2.toUnlock = [this.twin];

    game.genX3.researchList[3].toUnlock.push(this.travel);
    game.advWorkers.firstResearch.toUnlock.push(this.harvesting);
    const bonus = new ProductionBonus(this.harvesting, new Decimal(0.3));
    game.gatherers.list.forEach(u => {
      u.productionsEfficienty.push(bonus);
    });

    this.travel.toUnlock.push(game.tabs.travel, this.mastery);
    this.mastery.toUnlock.push(game.tabs.mastery);

    this.free4hWarp.onBuy = () => {
      game.warp(4 * 3600 * 1000);
    };
  }
  reset(science: FullUnit) {
    this.reloadMasteryPrice(science);
    this.researches.forEach(r => {
      r.reset();
    });

    this.mastery.reload();
    this.team1.unlocked = true;
    this.reloadLists();
  }
  reloadLists() {
    this.toDo = this.researches.filter(
      r => r.unlocked && (!r.done || r.unlimited)
    );
    this.done = this.researches.filter(
      r => r.unlocked && r.done && !r.unlimited
    );
    this.researchEmitter.emit("");
  }
  reloadMasteryPrice(science: FullUnit) {
    const masteryNum = this.mastery.quantity;
    this.mastery.genPrice(
      new Decimal(1e9).times(Decimal.pow(2, masteryNum)),
      science
    );
  }

  //#region Save and load
  getSave(): any {
    return {
      res: this.researches.map(r => r.getSave())
    };
  }
  restore(data: any, science: FullUnit): boolean {
    if ("res" in data) {
      for (const r of data.res) {
        this.researches.find(u => u.id === r.i).restore(r);
      }
      this.reloadMasteryPrice(science);
      this.reloadLists();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
