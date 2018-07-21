import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../../main.service";
import { Action } from "../../model/action";
import { Price } from "../../model/price";

@Component({
  selector: "app-cant-buy-signposts",
  templateUrl: "./cant-buy-signposts.component.html",
  styleUrls: ["./cant-buy-signposts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CantBuySignpostsComponent implements OnInit, OnDestroy {
  @Input() action: Action;
  sub: any;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getVal(price: Price): number {
    return Math.floor(
      price.base.quantity.div(price.priceUser).toNumber() * 100
    );
  }
  getPriceId(index, price: Price) {
    return price.base.id;
  }
}
