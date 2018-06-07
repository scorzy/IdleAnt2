import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Research } from "../research";
import { EventEmitter } from "@angular/core";

export class Researchs {
  science: FullUnit;

  researchs = new Array<Research>();
  toDo: Research[];
  done: Research[];

  team1: Research;
  team2: Research;
  twin: Research;

  constructor(public researchEmitter: EventEmitter<string>) {}

  declareStuff(): void {
    this.team1 = new Research("team1", this);
    this.team2 = new Research("team2", this);
    this.twin = new Research("twin", this);
    this.team1.unlocked = true;
    this.reloadLists();
  }
  setRelations(science: FullUnit): void {
    this.team1.genPrice(new Decimal(20), science);
    this.team2.genPrice(new Decimal(100), science);
    this.twin.genPrice(new Decimal(1e3), science);

    this.team1.toUnlock = [this.team2];
    this.team2.toUnlock = [this.twin];
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
