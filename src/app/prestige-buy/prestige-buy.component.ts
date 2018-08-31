import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Prestige } from "../model/prestige/prestige";
import { Price } from "../model/price";

@Component({
  selector: "app-prestige-buy",
  templateUrl: "./prestige-buy.component.html",
  styleUrls: ["./prestige-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.card]": "true"
  }
})
export class PrestigeBuyComponent implements OnInit {
  @Input()
  prestige: Prestige;
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.prestige) this.prestige.reload();
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.prestige.reload();
      this.prestige.reloadUserPrices();
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getPriceId(index, price: Price) {
    return price.base.id;
  }
}
