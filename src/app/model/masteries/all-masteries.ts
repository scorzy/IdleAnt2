import { DataSet, Edge, IdType, Network, Node } from "vis";
import { Mastery, MasteryTypes } from "./mastery";

export class AllMasteries {
  masteryPoint = 10;
  totals = new Array<number>();

  visMasteries: DataSet<Mastery>;
  visEdge: DataSet<{ from: number; to: number }>;

  constructor() {
    const av1 = new Mastery(0, MasteryTypes.MORE_FOLLOWERS);
    const av2 = new Mastery(3, MasteryTypes.MORE_IDLE_8H);
    av1.avaiable = true;
    av1.color = Mastery.avaiableColor;
    av2.avaiable = true;
    av2.color = Mastery.avaiableColor;

    this.visMasteries = new DataSet([
      av1,
      new Mastery(1, MasteryTypes.MORE_FOLLOWERS),
      new Mastery(2, MasteryTypes.MORE_FOLLOWERS),
      av2,
      new Mastery(4, MasteryTypes.MORE_IDLE_8H),
      new Mastery(5, MasteryTypes.MORE_IDLE_8H)
    ]);

    this.visEdge = new DataSet([
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 }
    ]);
  }

  getSum(type: MasteryTypes): number {
    return this.totals[type];
  }
  buy(id: number, loading = false): boolean {
    if (this.masteryPoint < 1) {
      return false;
    }
    const node = this.visMasteries.get(id);
    if (node && node.avaiable && !node.owned) {
      this.masteryPoint--;
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
      return true;
    } else {
      return false;
    }
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
      mp: this.masteryPoint
    };
  }
  restore(data: any) {
    if ("own" in data) {
      data.own.forEach(ow => this.buy(ow, true));
    }
    if ("mp" in data) {
      this.masteryPoint = data.mp;
    }
  }
  //#endregion
}
