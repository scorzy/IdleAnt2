import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { BugTypes } from "../model/bugsTypes";
declare let preventScroll;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(public ms: MainService) {
    //
  }

  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
  ngOnInit() {
    //
  }
  getBugId(index: number, bug: BugTypes) {
    return "" + bug;
  }
}
