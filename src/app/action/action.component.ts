import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Action } from "../model/action";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
  @Input()
  action: Action;

  constructor() {
    //Nothing
  }
}
