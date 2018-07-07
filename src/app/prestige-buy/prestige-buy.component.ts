import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { Prestige } from "../model/prestige/prestige";
import { MainService } from "../main.service";
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
  @Input() prestige: Prestige;
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
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
