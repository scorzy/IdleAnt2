import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Game } from "../model/game.service";
import { BaseUnit } from "../model/baseUnit";
import { FullUnit } from "../model/full-unit";
import { Action } from "../model/action";
import { MainService } from "../main.service";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"],
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitComponent implements OnInit, OnDestroy {
  paramsSub: any;
  unit: FullUnit;

  constructor(public ms: MainService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getUnit.bind(this));
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
  getUnit(params: any) {
    let id = params.id;
    if (id === undefined) {
      id = "fo";
    }
    const b = this.ms.game.units.find(u => u.id === id);
    if (b instanceof FullUnit) this.unit = b;
    this.unit.isNew = false;
  }
  getActId(index, action: Action) {
    return action.id;
  }
}
