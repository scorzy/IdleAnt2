import { EventEmitter } from "@angular/core";
import { Tags } from "../bugsTypes";
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

  free1hWarp: Research;
  free2hWarp: Research;
  free3hWarp: Research;

  spawn: Research;

  /**
   *  mastery, a special research
   *  never reset
   */
  mastery: Research;
  masteryResDone = 0;

  constructor(
    public researchEmitter: EventEmitter<string>,
    public game: Game
  ) {}

  declareStuff(): void {
    this.team1 = new Research("t", this);
    this.team2 = new Research("T", this);
    this.twin = new Research("W", this);
    this.travel = new Research("r", this);
    this.mastery = new Research("M", this);
    this.harvesting = new Research("h", this, true);

    this.free1hWarp = new Research("1", this);
    this.free2hWarp = new Research("2", this);
    this.free3hWarp = new Research("3", this);

    this.spawn = new Research("SP", this, true);

    this.team1.unlocked = true;
    this.reloadLists();
  }
  setRelations(science: FullUnit, game: Game): void {
    this.team1.genPrice(new Decimal(100), science);
    this.team2.genPrice(new Decimal(1e3), science);
    this.twin.genPrice(new Decimal(1e6), science);
    this.travel.genPrice(new Decimal(1e13), science);
    this.mastery.genPrice(new Decimal(1e20), science);
    this.harvesting.prices = game.genSciencePrice(1e3, 4);
    this.free1hWarp.prices = game.genSciencePrice(1);
    this.free2hWarp.prices = game.genSciencePrice(1);
    this.free3hWarp.prices = game.genSciencePrice(1);
    this.spawn.prices = game.genSciencePrice(1e6, 4);

    this.team1.toUnlock.push(this.team2);
    this.team2.toUnlock.push(this.twin);

    game.advWorkers.firstResearch.toUnlock.push(this.harvesting);
    const bonus = new ProductionBonus(this.harvesting, new Decimal(1));
    game.gatherers.list.forEach(u => {
      u.productionsEfficienty.push(bonus);
    });
    this.game.buildings.firstResearch.toUnlock.push(this.spawn);
    this.game.engineers.firstResearch.toUnlock.push(this.travel);
    this.travel.toUnlock.push(game.tabs.travel, this.mastery);
    this.mastery.toUnlock.push(game.tabs.mastery);

    this.free1hWarp.toUnlock.push(this.free2hWarp);
    this.free1hWarp.onBuy = () => {
      game.warp(3600 * 1000);
    };
    this.free2hWarp.toUnlock.push(this.free3hWarp);
    this.free2hWarp.onBuy = () => {
      game.warp(2 * 3600 * 1000);
    };
    this.free3hWarp.onBuy = () => {
      game.warp(3 * 3600 * 1000);
    };

    const larvaeBon = new ProductionBonus(this.spawn, new Decimal(0.5));
    this.game.units
      .filter(u => u.tags.includes(Tags.LARVA))
      .forEach(l => l.productionsBonus.push(larvaeBon));
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
      r =>
        r.unlocked &&
        (!r.done || (r.unlimited && r.quantity.lt(r.maxAutoBuyLevel)))
    );
    this.done = this.researches.filter(
      r =>
        r.unlocked &&
        r.done &&
        (!r.unlimited || r.quantity.gte(r.maxAutoBuyLevel))
    );
    this.researchEmitter.emit("");
  }
  reloadMasteryPrice(science: FullUnit) {
    this.mastery.genPrice(
      new Decimal(1e18).times(Decimal.pow(2, this.masteryResDone)),
      science
    );
  }

  //#region Save and load
  getSave(): any {
    return {
      res: this.researches.map(r => r.getSave()),
      mrd: this.masteryResDone
    };
  }
  restore(data: any, science: FullUnit): boolean {
    if ("res" in data) {
      for (const r of data.res) {
        const res = this.researches.find(u => u.id === r.i);
        if (res) res.restore(r);
      }
      this.masteryResDone =
        "mrd" in data ? data.mrd : this.game.allMateries.totalEarned;

      this.reloadMasteryPrice(science);
      this.reloadLists();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
