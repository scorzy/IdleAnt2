import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from "@angular/core";
import { MainService } from "../../main.service";
import { OptionsService } from "../../options.service";
declare let preventScroll;

@Component({
  selector: "app-ui-options",
  templateUrl: "./ui-options.component.html",
  styleUrls: ["./ui-options.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UiOptionsComponent implements OnInit, AfterViewInit {
  constructor(public ms: MainService, public os: OptionsService) {
    //
  }
  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
  ngOnInit() {
    //
  }
  onChangeMaterialPos() {
    this.ms.game.buildLists();
  }
}
