import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Malus } from "../model/malus";
import { Price } from "../model/price";
declare let preventScroll;

@Component({
  selector: "app-prestige",
  templateUrl: "./prestige.component.html",
  styleUrls: ["./prestige.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class PrestigeComponent implements OnInit, OnDestroy, AfterViewInit {
  sub: any;
  skip = false;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.ms.game.currentWorld.winConditions.forEach(w => w.reloadPercent());
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
