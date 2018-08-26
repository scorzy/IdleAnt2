import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BugTypes } from "../model/bugsTypes";
import { MainService } from "../main.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class HomeComponent implements OnInit {
  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    //
  }
  getBugId(index: number, bug: BugTypes) {
    return "" + bug;
  }
}
