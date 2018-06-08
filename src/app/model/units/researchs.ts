import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Research } from "../research";
import { EventEmitter } from "@angular/core";
import { Game } from "../game";

export class Researchs {
  science: FullUnit;

  researchs = new Array<Research>();
  toDo: Research[];
  done: Research[];

  team1: Research;
  team2: Research;
  twin: Research;

  scientificMethod2: Research;
  scientificMethod3: Research;

  constructor(public researchEmitter: EventEmitter<string>) {}

  declareStuff(): void {
    this.team1 = new Research("team1", this);
    this.team2 = new Research("team2", this);
    this.twin = new Research("twin", this);

    this.scientificMethod2 = new Research("scie2", this);
    this.scientificMethod3 = new Research("scie3", this);

    this.team1.unlocked = true;
    this.reloadLists();
  }
  setRelations(science: FullUnit, game: Game): void {
    this.team1.genPrice(new Decimal(20), science);
    this.team2.genPrice(new Decimal(100), science);
    this.twin.genPrice(new Decimal(1e3), science);

    this.team1.toUnlock = [this.team2];
    this.team2.toUnlock = [this.twin];

    game.genX2.researchList[3].toUnlock.push(this.scientificMethod2);
    game.genX3.researchList[3].toUnlock.push(this.scientificMethod3);

    this.scientificMethod2.genPrice(new Decimal(1e7), science);
    this.scientificMethod3.genPrice(new Decimal(1e11), science);

    science.productionsBonus.push(
      [this.scientificMethod2, new Decimal(0.75)],
      [this.scientificMethod2, new Decimal(1)]
    );
  }

  reloadLists() {
    this.toDo = this.researchs.filter(r => r.unlocked && !r.done);
    this.done = this.researchs.filter(r => r.unlocked && r.done);
    this.researchEmitter.emit("");
  }

  //#region Save and load
  getSave(): any {
    return {
      res: this.researchs.map(r => r.getSave())
    };
  }
  restore(data: any): boolean {
    if ("res" in data) {
      for (const r of data.res)
        this.researchs.find(u => u.id === r.i).restore(r);
      this.reloadLists();
      return true;
    } else {
      return false;
    }
  }
  //#endregion

  private genPrice(price: Decimal): Price[] {
    return [new Price(this.science, price, 1)];
  }
}
