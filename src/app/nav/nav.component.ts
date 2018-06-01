import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { Game } from "../model/game";
import { UnitGroup } from "../model/unit-group";
import { BaseUnit } from "../model/baseUnit";
import { MainService } from "../main.service";

// declare let isFinite;

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class NavComponent implements OnInit {
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => this.cd.markForCheck());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getListId(index, list: UnitGroup) {
    return list.name;
  }
  getUnitId(index, base: BaseUnit) {
    return base.id;
  }
}
