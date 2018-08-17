import { DataSet, Edge, IdType, Network, Node } from "vis";
import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { BaseUnit } from "./../baseUnit";
import { Mastery, MasteryTypes } from "./mastery";

export class AllMasteries {
  masteryPoint = 0;
  totalEarned = 0;
  totals = new Array<number>();

  visMasteries: DataSet<Mastery>;
  visEdge: DataSet<{ from: number; to: number }>;

  scienceBonus: BaseUnit;
  harvestBonus: BaseUnit;

  constructor(game: Game) {
    this.scienceBonus = new BaseUnit("scieMast");
    game.materials.science.productionsBonus.push(
      new ProductionBonus(this.scienceBonus, new Decimal(0.2))
    );
    this.harvestBonus = new BaseUnit("harvMast");
    const harvBon = new ProductionBonus(this.harvestBonus, new Decimal(0.2));
    game.gatherers.list.forEach(u => {
      u.productionsEfficienty.push(harvBon);
    });

    const lenght = Object.keys(MasteryTypes).length / 2;
    this.totals = new Array(lenght).fill(0);

    const av1 = new Mastery(0, MasteryTypes.MORE_FOLLOWERS);
    const av2 = new Mastery(5, MasteryTypes.MORE_IDLE_8H);
    const av3 = new Mastery(10, MasteryTypes.HARVEST_BONUS);
    const av4 = new Mastery(15, MasteryTypes.SCIENCE_BONUS);
    av1.avaiable = true;
    av1.color = Mastery.avaiableColor;
    av2.avaiable = true;
    av2.color = Mastery.avaiableColor;
    av3.avaiable = true;
    av3.color = Mastery.avaiableColor;
    av4.avaiable = true;
    av4.color = Mastery.avaiableColor;

    this.visMasteries = new DataSet([av1, av2, av3, av4]);
    this.visEdge = new DataSet([]);

    this.addMasteryLine(0, 1, MasteryTypes.MORE_FOLLOWERS, 3, 5);
    this.addMasteryLine(5, 6, MasteryTypes.MORE_IDLE_8H, 3, 10);
    this.addMasteryLine(10, 11, MasteryTypes.HARVEST_BONUS, 3, 15);
    this.addMasteryLine(15, 16, MasteryTypes.SCIENCE_BONUS, 3, 0);
  }

  getSum(type: MasteryTypes): number {
    return this.totals[type];
  }

  buy(id: number, loading = false): boolean {
    if (this.masteryPoint < 1 && !loading) {
      return false;
    }
    const node = this.visMasteries.get(id);
    if ((node && node.avaiable && !node.owned) || loading) {
      if (!loading) {
        this.masteryPoint--;
      }
      this.totals[node.type]++;

      const avEdges = this.visEdge.get({
        filter(item) {
          return item.from === id || item.to === id;
        }
      });
      const avNodesIds = new Array<number>();
      avEdges.forEach(avEdge => {
        const nodes = this.visMasteries.get({
          filter(item) {
            return (
              (item.id === avEdge.from || item.id === avEdge.to) &&
              !item.avaiable &&
              !item.owned
            );
          }
        });
        if (nodes.length > 0) {
          nodes.forEach(n => {
            {
              n.avaiable = true;
              n.color = Mastery.avaiableColor;
            }
          });
          this.visMasteries.update(nodes);
        }
      });

      const update: any = {
        id,
        owned: true,
        avaiable: true,
        color: Mastery.ownedColor
      };
      this.visMasteries.update(update);
      if (!loading) this.reloadBonus();

      return true;
    } else {
      return false;
    }
  }

  reloadBonus() {
    this.scienceBonus.quantity = new Decimal(
      this.getSum(MasteryTypes.SCIENCE_BONUS)
    );
    this.harvestBonus.quantity = new Decimal(
      this.getSum(MasteryTypes.HARVEST_BONUS)
    );
  }

  //#region Save and Load
  getSave(): any {
    return {
      own: this.visMasteries
        .get({
          filter(item) {
            return item.owned;
          }
        })
        .map(o => o.id),
      mp: this.masteryPoint,
      to: this.totalEarned
    };
  }
  restore(data: any) {
    if ("own" in data) {
      data.own.forEach(ow => this.buy(ow, true));
    }
    if ("mp" in data) {
      this.masteryPoint = data.mp;
    }
    if ("to" in data) {
      this.totalEarned = data.to;
    }
    this.reloadBonus();
  }
  //#endregion

  private addMasteryLine(
    fromN: number,
    startId: number,
    type: MasteryTypes,
    quantity = 1,
    toN = Number.NEGATIVE_INFINITY
  ) {
    for (let i = 0; i < quantity; i++) {
      this.visMasteries.add(new Mastery(startId + i, type));
    }
    this.visEdge.add({ from: fromN, to: startId });
    for (let i = 0; i < quantity - 1; i++) {
      this.visEdge.add({ from: startId + i, to: startId + i + 1 });
    }
    if (toN >= 0) {
      this.visEdge.add({ from: startId + quantity - 1, to: toN });
    }
  }
}
