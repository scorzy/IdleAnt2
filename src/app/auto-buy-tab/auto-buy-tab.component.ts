import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { AutoBuy } from "./../model/autoBuy/auto-buy";

@Component({
  selector: "app-auto-buy-tab",
  templateUrl: "./auto-buy-tab.component.html",
  styleUrls: ["./auto-buy-tab.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class AutoBuyTabComponent implements OnInit {
  unlSpecial = new Array<AutoBuy>();

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    this.unlSpecial = [];
    if (this.ms.game.allPrestige.autoBuyUnlock.autoBuyMin.done) {
      this.unlSpecial.push(this.ms.game.autoBuyManager.minuteAutoBuy);
    }
    if (this.ms.game.allPrestige.autoBuyUnlock.autoBuyResearch.done) {
      this.unlSpecial.push(this.ms.game.autoBuyManager.researchAutoBuy);
    }
  }
  getAutoBuyId(index: number, autoBuy: AutoBuy) {
    return autoBuy.id;
  }
}
