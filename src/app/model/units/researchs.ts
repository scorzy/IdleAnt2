import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Research } from "../research";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

export class Researchs {
  researchs: Research[];
  toDo: Research[];
  done: Research[];

  team1: Research;
  team2: Research;
  twin: Research;

  constructor(
    public science: FullUnit,
    public researchEmitter: EventEmitter<string>
  ) {}

  declareStuff(): void {
    this.team1 = new Research(
      "team1",
      "Team 1",
      "Team 1",
      this.genPrice(new Decimal(20)),
      this
    );
    this.team2 = new Research(
      "team2",
      "Team 2",
      "Team 2",
      this.genPrice(new Decimal(100)),
      this
    );
    this.twin = new Research(
      "twin",
      "Twin",
      "Twin",
      this.genPrice(new Decimal(1e3)),
      this
    );
    this.team1.unlocked = true;
    this.researchs = [this.team1, this.team2, this.twin];
    this.reloadLists();
  }
  setRelations(): void {
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
