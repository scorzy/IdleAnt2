import { Component, OnInit } from "@angular/core";
import { Game } from "../model/game";
import { UnitGroup } from "../model/unit-group";
import { BaseUnit } from "../model/baseUnit";
import { MainService } from "../main.service";

// declare let isFinite;

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  host: {
    "[class.content-container]": "true"
  }
})
export class NavComponent implements OnInit {
  isFinite = isFinite;

  constructor(public ms: MainService) {}

  ngOnInit() {
    //Nothing
  }

  getListId(index, list: UnitGroup) {
    return list.name;
  }
  getUnitId(index, base: BaseUnit) {
    return base.id;
  }
}
