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
  foodBonus: BaseUnit;
  woodBonus: BaseUnit;
  crystallBonus: BaseUnit;

  harvestBonus: BaseUnit;
  materialBonus: BaseUnit;

  constructor(game: Game) {
    this.scienceBonus = new BaseUnit("scieMast");
    game.materials.science.productionsBonus.push(
      new ProductionBonus(this.scienceBonus, new Decimal(0.1))
    );

    this.foodBonus = new BaseUnit("fooMast");
    game.materials.food.productionsBonus.push(
      new ProductionBonus(this.foodBonus, new Decimal(0.1))
    );

    this.woodBonus = new BaseUnit("wooMast");
    game.materials.wood.productionsBonus.push(
      new ProductionBonus(this.woodBonus, new Decimal(0.1))
    );

    this.crystallBonus = new BaseUnit("cryMast");
    game.materials.crystal.productionsBonus.push(
      new ProductionBonus(this.crystallBonus, new Decimal(0.1))
    );

    this.harvestBonus = new BaseUnit("harvMast");
    const harvBon = new ProductionBonus(this.harvestBonus, new Decimal(0.2));
    game.gatherers.list.forEach(u => {
      u.productionsEfficienty.push(harvBon);
    });

    this.materialBonus = new BaseUnit("matMast");
    const matBon = new ProductionBonus(this.materialBonus, new Decimal(0.1));
    game.materials.list.forEach(u => {
      u.productionsBonus.push(matBon);
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

    const matGain = new Mastery(20, MasteryTypes.MATERIAL_GAIN);

    this.visMasteries = new DataSet([av1, av2, av3, av4, matGain]);
    this.visEdge = new DataSet([]);

    this.addMasteryLine(0, 1, MasteryTypes.MORE_FOLLOWERS, 4, 5);
    this.addMasteryLine(5, 6, MasteryTypes.MORE_IDLE_8H, 4, 10);
    this.addMasteryLine(10, 11, MasteryTypes.HARVEST_BONUS, 4, 15);
    this.addMasteryLine(15, 16, MasteryTypes.SCIENCE_BONUS, 4, 0);

    this.addMasteryLine(0, 21, MasteryTypes.MORE_FOLLOWERS, 3, 20);
    this.addMasteryLine(5, 25, MasteryTypes.MORE_IDLE_8H, 3, 20);
    this.addMasteryLine(10, 30, MasteryTypes.HARVEST_BONUS, 3, 20);
    this.addMasteryLine(15, 35, MasteryTypes.SCIENCE_BONUS, 3, 20);

    //  Followers
    this.addMasteryLine(0, 40, MasteryTypes.MORE_FOLLOWERS_GA, 5);
    this.addMasteryLine(0, 45, MasteryTypes.MORE_FOLLOWERS_WO, 5, 44);

    //  Time
    this.addMasteryLine(5, 50, MasteryTypes.TIME_GEN, 5);
    this.addMasteryLine(5, 55, MasteryTypes.TIME_BANK, 5, 54);

    //  Team
    this.addMasteryLine(10, 60, MasteryTypes.TEAM_START, 5);
    this.addMasteryLine(10, 65, MasteryTypes.TEAM_PRESTIGE, 5, 64);

    //  Science && Tecnology
    this.addMasteryLine(15, 70, MasteryTypes.SCIENTIFIC_METHOD, 5);
    this.addMasteryLine(15, 75, MasteryTypes.THECNOLOGY_PRESTIGE, 5, 74);

    //  Single material bonus
    this.addMasteryLine(matGain.id, 80, MasteryTypes.SCIENCE_BONUS, 3);
    this.addMasteryLine(matGain.id, 85, MasteryTypes.FOOD_BONUS, 3);
    this.addMasteryLine(matGain.id, 90, MasteryTypes.WOOD_BONUS, 3);
    this.addMasteryLine(matGain.id, 95, MasteryTypes.CRYSTALL_BONUS, 3);
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
    this.foodBonus.quantity = new Decimal(this.getSum(MasteryTypes.FOOD_BONUS));
    this.woodBonus.quantity = new Decimal(this.getSum(MasteryTypes.WOOD_BONUS));
    this.crystallBonus.quantity = new Decimal(
      this.getSum(MasteryTypes.CRYSTALL_BONUS)
    );

    this.harvestBonus.quantity = new Decimal(
      this.getSum(MasteryTypes.HARVEST_BONUS)
    );
    this.materialBonus.quantity = new Decimal(
      this.getSum(MasteryTypes.MATERIAL_GAIN)
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
