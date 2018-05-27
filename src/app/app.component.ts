import { Component } from "@angular/core";
import * as Decimal from "break_infinity.js";
import { MainService } from "./main.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private service: MainService) {}
}
