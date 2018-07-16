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
    this.autoBuyers = [];
    if (
      this.unit.buyAction &&
      this.unit.buyAction.autoBuyer &&
      this.ms.game.allPrestige.autoBuyUnlock.autoBuyQuantity.done
    )
      this.autoBuyers.push(this.unit.buyAction.autoBuyer);

    if (
      this.unit.teamAction &&
      this.unit.teamAction.autoBuyer &&
      this.ms.game.allPrestige.autoBuyUnlock.autoBuyTeam.done
    )
      this.autoBuyers.push(this.unit.teamAction.autoBuyer);

    if (
      this.unit.twinAction &&
      this.unit.twinAction.autoBuyer &&
      this.ms.game.allPrestige.autoBuyUnlock.autoBuyTwin.done
    )
      this.autoBuyers.push(this.unit.twinAction.autoBuyer);
  }

  getAutoBuyId(index: number, autoBuy: AutoBuy) {
    return autoBuy.id;
  }
}
