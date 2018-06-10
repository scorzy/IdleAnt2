import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { MainService } from "../main.service";
import { ActivatedRoute } from "@angular/router";
import { UnitGroup } from "../model/unit-group";
import { ActionGroup } from "../model/actions/action-group";
import {
  UnitQuantitySorter,
  UnitBoughtSorter,
  UnitTeamSorter,
  UnitTwinSorter
} from "../model/utility";

@Component({
  selector: "app-unit-group",
  templateUrl: "./unit-group.component.html",
  styleUrls: ["./unit-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitGroupComponent implements OnInit {
  paramsSub: any;
  sub: any;

  unitGroup: UnitGroup;

  unitsSpan = "";
  hatchActionGrp: ActionGroup;
  teamActionGrp: ActionGroup;
  twinActionGrp: ActionGroup;

  unitQuantitySorter = new UnitQuantitySorter();
  unitBoughtSorter = new UnitBoughtSorter();
  unitTeamSorter = new UnitTeamSorter();
  unitTwinSorter = new UnitTwinSorter();

  team = false;
  twin = false;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getGroup.bind(this));
    this.sub = this.ms.updateEmitter.subscribe(m => this.cd.markForCheck());
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.sub.unsubscribe();
  }
  getGroup(params: any) {
    let id = "" + params.id;
    if (id === undefined) id = "0";
    this.unitGroup = this.ms.game.unitGroups.find(g => "" + g.id === id);

    this.unitsSpan = this.unitGroup.unlocked
      .map(u => u.name)
      .reduce((p, c) => p + ", " + c);

    if (this.unitGroup.unlocked[0].buyAction) {
      this.hatchActionGrp = new ActionGroup(
        "Hatch",
        this.unitGroup.unlocked.filter(u => u.buyAction).map(u => u.buyAction)
      );
      if (this.ms.game.researches.team2.done) {
        this.team = true;
        this.teamActionGrp = new ActionGroup(
          "Teamwork",
          this.unitGroup.unlocked
            .filter(u => u.teamAction)
            .map(u => u.teamAction)
        );
      }
      if (this.ms.game.researches.twin.done) {
        this.twin = true;
        this.twinActionGrp = new ActionGroup(
          "Twin",
          this.unitGroup.unlocked
            .filter(u => u.twinAction)
            .map(u => u.teamAction)
        );
      }
    }
    this.cd.markForCheck();
  }
}
