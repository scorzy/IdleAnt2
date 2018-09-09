import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from "@angular/core";
declare let preventScroll;

@Component({
  selector: "app-options-nav",
  templateUrl: "./options-nav.component.html",
  styleUrls: ["./options-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class OptionsNavComponent implements OnInit, AfterViewInit {
  constructor() {
    //Nothig
  }
  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
  ngOnInit() {
    //Nothig
  }
}
