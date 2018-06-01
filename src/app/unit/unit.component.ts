import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Game } from "../model/game";
import { BaseUnit } from "../model/baseUnit";
import { FullUnit } from "../model/full-unit";
import { Action } from "../model/action";
import { MainService } from "../main.service";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitComponent implements OnInit, OnDestroy {
  paramsSub: any;
  sub: any;
  unit: FullUnit;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getUnit.bind(this));
    this.sub = this.ms.updateEmitter.subscribe(m => this.cd.markForCheck());
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.sub.unsubscribe();
  }
  getUnit(params: any) {
    let id = params.id;
    if (id === undefined) {
      id = "fo";
    }
    const b = this.ms.game.units.find(u => u.id === id);
    if (b instanceof FullUnit) this.unit = b;
    this.unit.isNew = false;
    this.cd.markForCheck();
  }
  getActId(index, action: Action) {
    return action.id;
  }
}
