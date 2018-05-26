import { Component, OnInit } from "@angular/core";
import { GameService } from "../model/game.service";
import { UnitGroup } from "../model/unit-group";
import { BaseUnit } from "../model/baseUnit";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  host: {
    "[class.content-container]": "true"
  }
})
export class NavComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {
    //Nothing
  }

  getListId(index, list: UnitGroup) {
    return list.name;
  }
}
