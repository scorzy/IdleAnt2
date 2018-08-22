import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { UnitGroup } from "../../model/unit-group";

@Component({
  selector: "app-group-autobuy",
  templateUrl: "./group-autobuy.component.html",
  styleUrls: ["./group-autobuy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupAutobuyComponent implements OnInit {
  @Input() unitGroup: UnitGroup;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  ngOnChanges() {}
}
