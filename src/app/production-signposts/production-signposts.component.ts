import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Production } from "../model/production";
import { ProductionBonus } from "../model/production-bonus";

@Component({
  selector: "app-production-signposts",
  templateUrl: "./production-signposts.component.html",
  styleUrls: ["./production-signposts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionSignpostsComponent implements OnInit {
  @Input()
  production: Production;
  open = false;

  productionsAll = new Array<ProductionBonus>();
  productionsEfficienty = new Array<ProductionBonus>();
  productionsBonus = new Array<ProductionBonus>();

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    this.productionsAll = new Array<ProductionBonus>();
    this.productionsEfficienty = new Array<ProductionBonus>();
    this.productionsBonus = new Array<ProductionBonus>();

    if (this.production) {
      this.productionsAll = this.production.producer.productionsAll.filter(bn =>
        bn.isActive()
      );
      if (this.production.ratio.gt(0)) {
        this.productionsEfficienty = this.production.producer.productionsEfficienty.filter(
          bn => bn.isActive()
        );
        this.productionsBonus = this.production.product.productionsBonus.filter(
          bn => bn.isActive()
        );
      }
    }
  }

  getProdID(index, bon: ProductionBonus) {
    return bon.unit.id + bon.quantity.toNumber();
  }
}
