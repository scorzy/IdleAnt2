import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { Action } from "../../model/action";
import { Prestige } from "../../model/prestige/prestige";
import { Price } from "../../model/price";
import { MainService } from "../../main.service";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent implements OnInit {
  @Input() action: Action;
  showTime = true;

  sub: any;

  @Input() buttonsOnly = false;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.showTime = !(this.action instanceof Prestige);

    if (this.action) {
      this.action.reloadUserPrices();
      this.action.reloadAvailableTime();
    }
    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.action.reloadUserPrices();
      this.action.reloadAvailableTime();
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
}
