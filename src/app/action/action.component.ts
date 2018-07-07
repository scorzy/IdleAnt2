import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { Action } from "../model/action";
import { Price } from "../model/price";
import { MainService } from "../main.service";
import { TeamAction } from "../model/actions/team-action";
import { TwinAction } from "../model/actions/twin-action";
import { Prestige } from "../model/prestige/prestige";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent implements OnInit, OnDestroy {
  @Input() action: Action;
  showTime = true;
  sub: any;
  shape: string;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.shape =
      this.action instanceof TeamAction
        ? "angle"
        : this.action instanceof TwinAction
          ? "angle-double"
          : "";
    this.showTime = !(this.action instanceof Prestige);
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
}
