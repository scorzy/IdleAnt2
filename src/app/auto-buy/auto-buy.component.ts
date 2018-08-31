import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { AutoBuy } from "../model/autoBuy/auto-buy";

@Component({
  selector: "app-auto-buy",
  templateUrl: "./auto-buy.component.html",
  styleUrls: ["./auto-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoBuyComponent implements OnInit, OnDestroy {
  @Input()
  autoBuy: AutoBuy;
  sub: any;
  bought = false;
  progress = 0;

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    this.autoBuy.reload();
    this.bought = this.autoBuy.quantity.gt(0);
    if (this.bought) {
      this.progress = Math.floor(
        (this.autoBuy.current / this.autoBuy.max) * 100
      );
    }
    this.sub = this.ms.updateEmitter.subscribe(s => {
      this.autoBuy.reload();
      this.bought = this.autoBuy.quantity.gt(0);
      if (this.bought) {
        this.progress = Math.floor(
          (this.autoBuy.current / this.autoBuy.max) * 100
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  reload() {
    this.ms.game.autoBuyManager.buildActiveList();
  }
}
