import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { Production } from "../model/production";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";
import { ProductionBonus } from "../model/production-bonus";

@Component({
  selector: "app-production-signposts",
  templateUrl: "./production-signposts.component.html",
  styleUrls: ["./production-signposts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionSignpostsComponent implements OnInit {
  @Input() production: Production;
  open = false;

  productionsBonus = new Array<ProductionBonus>();

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    if (this.production)
      this.productionsBonus = this.production.product.productionsBonus.filter(
        bn => bn.isActive()
      );
  }

  getProdID(index, bon: ProductionBonus) {
    return bon.unit.id + bon.quantity.toNumber();
  }
}
