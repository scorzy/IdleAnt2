import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { UnitGroup } from "../../model/unit-group";

@Component({
  selector: "app-group-auto-buy",
  templateUrl: "./group-auto-buy.component.html",
  styleUrls: ["./group-auto-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupAutoBuyComponent implements OnInit {
  @Input()
  unitGroup: UnitGroup;

  constructor() {}

  ngOnInit() {}
}
