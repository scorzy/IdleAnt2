import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";

@Component({
  selector: "app-ui-options",
  templateUrl: "./ui-options.component.html",
  styleUrls: ["./ui-options.component.scss"],
  host: {
    "[class.content-area]": "true"
  }
})
export class UiOptionsComponent implements OnInit {
  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    //
  }
}
