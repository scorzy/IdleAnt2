import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges
} from "@angular/core";
import { FullUnit } from "../model/full-unit";
import { AutoBuy } from "../model/autoBuy/auto-buy";
import { MainService } from "../main.service";

@Component({
  selector: "app-unit-auto-buy",
  templateUrl: "./unit-auto-buy.component.html",
  styleUrls: ["./unit-auto-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitAutoBuyComponent implements OnInit, OnChanges {
  @Input() unit: FullUnit;
  autoBuyers = Array<AutoBuy>();

  constructor(public ms: MainService) {
    this.ms.lastTab = 2;
  }

  ngOnInit() {
    //
  }

  ngOnChanges() {
    this.autoBuyers = this.autoBuyers = this.unit.actions
      .filter(a => !!a.autoBuyer)
      .map(a => a.autoBuyer);
  }

  getAutoBuyId(index: number, autoBuy: AutoBuy) {
    return autoBuy.id;
  }
}
