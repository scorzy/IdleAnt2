import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { Action } from "../model/action";
import { WarpAction } from "../model/actions/warp-action";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent implements OnInit {
  @Input()
  action: Action;
  skippable = true;

  constructor() {
    //Nothing
  }
  ngOnInit(): void {
    this.skippable = !(this.action instanceof WarpAction);
  }
}
