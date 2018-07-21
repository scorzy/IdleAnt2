import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { Action } from "../model/action";
import { TeamAction } from "../model/actions/team-action";
import { TwinAction } from "../model/actions/twin-action";
import { Prestige } from "../model/prestige/prestige";
import { Price } from "../model/price";

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
