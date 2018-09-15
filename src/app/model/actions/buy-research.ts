import { Action } from "../action";
import { Researches } from "../units/researches";

export class BuyResearch extends Action {
  constructor(private researches: Researches) {
    super("resAutoBAct", "Buy Research", "Buy the less expensive research");
  }
  buy(toBuy = new Decimal(1)): boolean {
    const buyList = this.researches.toDo.filter(
      r => r.autoBuyable && r.quantity.lt(r.maxAutoBuyLevel)
    );
    if (buyList.length < 1) return false;

    buyList.sort((res1, res2) =>
      res1.prices[0].priceUser.cmp(res2.prices[0].priceUser)
    );
    const len = toBuy.min(buyList.length).toNumber();
    let ret = false;

    for (let i = 0; i < len; i++) {
      if (buyList[i].buy()) {
        ret = true;
      } else {
        break;
      }
    }
    return ret;
  }
}
