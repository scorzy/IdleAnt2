import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy
} from "@angular/core";
import { AutoBuy } from "../model/autoBuy/auto-buy";
import { MainService } from "../main.service";

@Component({
  selector: "app-auto-buy",
  templateUrl: "./auto-buy.component.html",
  styleUrls: ["./auto-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoBuyComponent implements OnInit, OnDestroy {
  @Input() autoBuy: AutoBuy;
  sub: any;

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    this.autoBuy.reload();
    this.sub = this.ms.updateEmitter.subscribe(s => this.autoBuy.reload());
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  reload() {
    this.ms.game.autoBuyManager.buildActiveList();
  }
}
