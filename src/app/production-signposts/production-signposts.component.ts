import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { Production } from "../model/production";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";

@Component({
  selector: "app-production-signposts",
  templateUrl: "./production-signposts.component.html",
  styleUrls: ["./production-signposts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionSignpostsComponent implements OnInit {
  @Input() production: Production;
  open = false;

  productionsBonus = new Array<[BaseUnit, Decimal]>();

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    this.productionsBonus = this.production.product.productionsBonus.filter(
      bn => bn["0"].unlocked
    );
  }

  getProdID(index, bon: Array<[BaseUnit, Decimal]>) {
    return bon["0"].id + bon["1"].toNumber();
  }
}
