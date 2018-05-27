import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-price-line",
  templateUrl: "./price-line.component.html",
  styleUrls: ["./price-line.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceLineComponent implements OnInit {
  @Input() name: string;
  @Input() canBuy: boolean;
  @Input() price: Decimal;

  constructor() {
    //Nothing
  }
  ngOnInit() {
    //Nothing
  }
}
