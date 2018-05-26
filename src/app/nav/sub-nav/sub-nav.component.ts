import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { UnitGroup } from "../../model/unit-group";
import { BaseUnit } from "../../model/baseUnit";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-sub-nav",
  templateUrl: "./sub-nav.component.html",
  styleUrls: ["./sub-nav.component.scss"]
})
export class SubNavComponent implements OnInit {
  @Input() unitGroup: UnitGroup;

  constructor() {
    //Nothing
  }

  ngOnInit() {
    //Nothing
  }
  getUnitId(index, base: BaseUnit) {
    return base.id;
  }
}
