import { Component } from "@angular/core";
import * as Decimal from "break_infinity.js";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  num = new Decimal(2);
}
