import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-options-nav",
  templateUrl: "./options-nav.component.html",
  styleUrls: ["./options-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class OptionsNavComponent implements OnInit {
  constructor() {
    //Nothig
  }

  ngOnInit() {
    //Nothig
  }
}
