import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { FullUnit } from "../../model/full-unit";

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
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  quantity: Decimal;
  @Input()
  perSec: Decimal;
  @Input()
  isNew: boolean;
  @Input()
  isEnding: boolean;
  @Input()
  isStopped: boolean;
  @Input()
  unit: FullUnit;
  @Input()
  team: boolean;
  @Input()
  twin: boolean;
  @Input()
  isMalus = false;

  constructor() {
    //Nothing
  }
  ngOnInit() {
    //
  }
}
