import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Malus } from "../model/malus";
import { Price } from "../model/price";

@Component({
  selector: "app-prestige",
  templateUrl: "./prestige.component.html",
  styleUrls: ["./prestige.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class PrestigeComponent implements OnInit, OnDestroy {
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.ms.game.currentWorld.winContidions.forEach(w => w.reloadPercent());
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getPriceId(index: number, price: Price) {
    return "" + index + price.base.id;
  }
  getMalusId(index: number, malus: Malus) {
    return "" + index + malus.id;
  }
}
