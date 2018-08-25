import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Price } from "../model/price";
import { Research } from "../model/research";

@Component({
  selector: "app-research",
  templateUrl: "./research.component.html",
  styleUrls: ["./research.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.card]": "true"
  }
})
export class ResearchComponent implements OnInit, OnDestroy {
  @Input() research: Research;
  sub: any;

  minuteSkip = 1;
  canSkip = false;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.ceckSkip();
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.research.reloadUserPrices();
      this.research.reloadAvailableTime();
      this.ceckSkip();
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getPriceId(index, price: Price) {
    return price.base.id;
  }
  ceckSkip() {
    this.canSkip = false;

    if (!this.research.canBuy) {
      this.minuteSkip = Math.ceil(
        Math.max(this.research.availableIn / 60000, 1)
      );
      this.canSkip = this.ms.game.time.quantity.gt(this.minuteSkip * 60);
    }
  }
  skip() {
    if (this.canSkip) this.ms.game.actMin.buy(new Decimal(this.minuteSkip));
  }
}
