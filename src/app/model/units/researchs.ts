import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Research } from "../research";
import { Game } from "../game";

export class Researchs {
  researchs: Research[];

  team1: Research;
  team2: Research;

  constructor(public science: FullUnit) {}

  declareStuff(): void {
    this.team1 = new Research(
      "team1",
      "Team 1",
      "Team 1",
      this.genPrice(new Decimal(20))
    );
    this.team2 = new Research(
      "team2",
      "Team 2",
      "Team 2",
      this.genPrice(new Decimal(100))
    );
    this.researchs = [this.team1, this.team2];
  }
  setRelations(): void {
    this.team1.toUnlock = [this.team2];
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
