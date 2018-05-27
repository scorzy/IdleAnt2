import { Component, OnInit, Input } from "@angular/core";
import { Action } from "../model/action";
import { Price } from "../model/price";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
  host: {
    "[class.card]": "true"
  }
})
export class ActionComponent implements OnInit {
  @Input() action: Action;

  constructor() {
    //Nothing
  }

  ngOnInit() {
    // this.action.reload();
  }
  getPriceId(index, price: Price) {
    return price.base.id;
  }
}
