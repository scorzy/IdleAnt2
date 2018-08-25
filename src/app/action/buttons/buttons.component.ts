import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../../main.service";
import { Action } from "../../model/action";
import { Prestige } from "../../model/prestige/prestige";
import { Price } from "../../model/price";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent implements OnInit {
  @Input() action: Action;
  @Input() buttonsOnly = false;
  @Input() skippable = true;

  showTime = true;
  minuteSkip = 1;
  canSkip = false;

  sub: any;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.showTime = !(this.action instanceof Prestige);

    if (this.action) {
      this.action.reloadUserPrices();
      this.action.reloadAvailableTime();
      this.ceckSkip();
    }

    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.action.reloadUserPrices();
      this.action.reloadAvailableTime();
      this.ceckSkip();
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getPriceId(index, price: Price) {
    return price.base.id;
  }
  buy(quantity: Decimal) {
    this.action.buy(quantity);
    this.ms.updateEmitter.emit(1);
  }
  ceckSkip() {
    this.canSkip = false;
    if (!this.action.canBuy && this.skippable && this.showTime) {
      this.minuteSkip = Math.ceil(Math.max(this.action.availableIn / 60000, 1));
      this.canSkip = this.ms.game.time.quantity.gt(this.minuteSkip * 60);
    }
  }
  skip() {
    if (this.canSkip) this.ms.game.actMin.buy(new Decimal(this.minuteSkip));
  }
}
