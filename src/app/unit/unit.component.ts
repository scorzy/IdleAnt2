import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "../model/game.service";
import { BaseUnit } from "../model/baseUnit";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"],
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitComponent implements OnInit {
  paramsSub: any;
  unit: BaseUnit;

  constructor(public gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getUnit.bind(this));
  }
  getUnit(params: any) {
    let id = params.id;
    if (id === undefined) {
      id = "fo";
    }
    this.unit = this.gameService.units.find(u => u.id === id);
  }
}
