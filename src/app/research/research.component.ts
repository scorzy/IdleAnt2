import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Research } from "../model/research";
import { MainService } from "../main.service";
import { Price } from "../model/price";

@Component({
  selector: "app-research",
  templateUrl: "./research.component.html",
  styleUrls: ["./research.component.scss"],
  host: {
    "[class.card]": "true"
  }
})
export class ResearchComponent implements OnInit, OnDestroy {
  @Input() research: Research;
  sub: any;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.research.reloadUserPrices();
      this.research.reloadAvailableTime();
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
