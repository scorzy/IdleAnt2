import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MainService } from "../main.service";
import { FullUnit } from "../model/full-unit";

@Component({
  selector: "app-unit-tabs",
  templateUrl: "./unit-tabs.component.html",
  styleUrls: ["./unit-tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitTabsComponent implements OnInit {
  overviewActive = true;
  paramsSub: any;
  sub: any;
  unit: FullUnit;
  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.ms.overviewTaActive = this.ms.lastTab === 0;
    this.ms.prestigeTaActive = this.ms.lastTab !== 0;
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getUnit.bind(this));
    this.sub = this.ms.updateEmitter.subscribe(() => this.cd.markForCheck());
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.sub.unsubscribe();
  }
  getUnit(params: any) {
    let id = params.id;
    if (id === undefined) {
      id = this.ms.game.materials.food.id;
    }
    const b = this.ms.game.units.find(u => u.id === id);
    if (b instanceof FullUnit) {
      this.unit = b;
      this.unit.isNew = false;
      this.ms.game.lastUnitUrl = "nav/unit/" + b.id;
      this.unit.getRandomDescription();
    }
    this.cd.markForCheck();
  }
}
