import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { Action } from "../model/action";
import { Price } from "../model/price";
import { MainService } from "../main.service";
import { TeamAction } from "../model/actions/team-action";
import { TwinAction } from "../model/actions/twin-action";
import { Prestige } from "../model/prestige/prestige";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
  @Input() action: Action;

  constructor() {
    //Nothing
  }
}
