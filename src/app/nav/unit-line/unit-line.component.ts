import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-unit-line",
  templateUrl: "./unit-line.component.html",
  styleUrls: ["./unit-line.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.fullWidth]": "true"
  }
})
export class UnitLineComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() quantity: Decimal;
  @Input() perSec: Decimal;

  constructor() {
    //Nothing
  }

  ngOnInit() {
    //Nothing
  }
}
