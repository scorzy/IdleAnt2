import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { MainService } from "../../main.service";
import { Action } from "../../model/action";
import { TeamAction } from "../../model/actions/team-action";
import { TwinAction } from "../../model/actions/twin-action";

@Component({
  selector: "app-action-header",
  templateUrl: "./action-header.component.html",
  styleUrls: ["./action-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionHeaderComponent implements OnChanges {
  @Input() action: Action;
  @Input() quantity: Decimal;
  shape: string;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.shape =
      this.action instanceof TeamAction
        ? "angle"
        : this.action instanceof TwinAction
          ? "angle-double"
          : "";
  }
}
