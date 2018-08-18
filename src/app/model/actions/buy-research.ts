import { Researches } from "../units/researches";
import { Action } from "./../action";

export class BuyResearch extends Action {
  constructor(private researches: Researches) {
    super("resAutoBAct", "", "");
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (this.researches.toDo.length < 1) return false;

    const lessExpRes = this.researches.toDo.reduce((res1, res2) => {
      return res1.prices[0].priceUser.lt(res2.prices[0].priceUser)
        ? res1
        : res2;
    }, this.researches.toDo[0]);
    return lessExpRes.buy();
  }
}
