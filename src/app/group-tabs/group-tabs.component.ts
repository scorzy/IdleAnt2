import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import uniq from "lodash-es/uniq";
import { MainService } from "../main.service";
import { BugTypes } from "../model/bugsTypes";
import { UnitGroup } from "../model/unit-group";
import { Utility } from "../model/utility";

@Component({
  selector: "app-group-tabs",
  templateUrl: "./group-tabs.component.html",
  styleUrls: ["./group-tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class GroupTabsComponent implements OnInit, OnDestroy {
  paramsSub: any;
  paramsSave: any;

  unitGroup: UnitGroup;

  bugs = new Array<BugTypes>();
  utility = Utility;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getGroup.bind(this));
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
  getGroup(params: any) {
    this.paramsSave = params;
    let id = "" + params.id;
    if (id === undefined) id = "0";
    this.unitGroup = this.ms.game.unitGroups.find(g => "" + g.id === id);
    if (!this.unitGroup) this.unitGroup = this.ms.game.unitGroups[0];
    if (!this.unitGroup) return;

    this.ms.game.lastUnitUrl = "nav/group/" + this.unitGroup.id;

    this.bugs = uniq(this.unitGroup.unlocked.map(u => u.bugType));

    this.cd.markForCheck();
  }
  select(bug: BugTypes) {
    this.unitGroup.selected = this.unitGroup.unlocked.filter(
      u => u.bugType === bug
    );
  }
  selectAdd(bug: BugTypes) {
    this.unitGroup.selected = uniq(
      this.unitGroup.selected.concat(
        this.unitGroup.unlocked.filter(u => u.bugType === bug)
      )
    );
  }
  selectRemove(bug: BugTypes) {
    this.unitGroup.selected = this.unitGroup.selected.filter(
      u => u.bugType !== bug
    );
  }

  getBugId(index: number, bug: BugTypes) {
    return bug;
  }
}
