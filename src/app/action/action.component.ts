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
import { isNumber } from "util";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent implements OnInit, OnDestroy {
  @Input() action: Action;
  sub: any;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.action.reloadUserPrices();
    this.cd.markForCheck();

    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.action.reloadUserPrices();
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
