import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MainService } from "../../main.service";
import { OptionsService } from "../../options.service";

@Component({
  selector: "app-ui-options",
  templateUrl: "./ui-options.component.html",
  styleUrls: ["./ui-options.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UiOptionsComponent implements OnInit {
  constructor(public ms: MainService, public os: OptionsService) {
    //
  }

  ngOnInit() {
    //
  }
  onChangeMaterialPos() {
    this.ms.game.buildLists();
  }
}
