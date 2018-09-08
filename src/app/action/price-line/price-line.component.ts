import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { BaseUnit } from "../../model/baseUnit";
import { FullUnit } from "../../model/full-unit";

@Component({
  selector: "app-price-line",
  templateUrl: "./price-line.component.html",
  styleUrls: ["./price-line.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceLineComponent implements OnInit {
  @Input()
  unit: FullUnit;
  @Input()
  canBuy: boolean;
  @Input()
  price: Decimal;

  constructor() {
    //Nothing
  }
  ngOnInit() {
    //Nothing
  }
}
