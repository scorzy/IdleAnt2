import { Action } from "../action";
import { Price } from "../price";

export class ActionGroup {
  public canBuy = false;

  public userNum = 1;
  public realNum = new Decimal(1);

  public availableIn = NaN;

  prices = new Array<Price>();
  pricesTemp = new Array<Price>();

  constructor(public name: string, public actionList: Action[]) {
    this.actionList = this.actionList.filter(a => !a.complete && a.unlocked);
    this.actionList
      .map(b => b.prices)
      .forEach(p => p.forEach(p2 => this.prices.push(p2)));

    this.reload();
  }

  public reload() {
    if (this.actionList.findIndex(a => !a.canBuy) > -1) {
      this.canBuy = false;
    } else {
      let real = 1;
      if (!isNaN(this.userNum) && this.userNum >= 1) real = this.userNum;
      this.realNum = new Decimal(real);

      this.pricesTemp = new Array<Price>();

      this.actionList.forEach(a => {
        a.prices.forEach(p => {
          p.loadPriceUser(this.realNum, a.quantity);
          const price = this.pricesTemp.find(k => k.base === p.base);
          if (price) {
            price.price = price.price.plus(p.priceUser);
          } else {
            const priTemp = new Price(p.base, p.priceUser, 1);
            this.pricesTemp.push(priTemp);
          }
        });

        this.pricesTemp.forEach(p => p.reload(new Decimal(0)));
        this.canBuy = this.pricesTemp.findIndex(p => !p.canBuy) < 0;
      });
    }
  }

  public buy(toBuy = new Decimal(1)): boolean {
    let ret = true;
    this.actionList.forEach(a => {
      if (!a.buy(toBuy)) {
        ret = false;
      }
    });
    return ret;
  }
}
