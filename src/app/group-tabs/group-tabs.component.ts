import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MainService } from "../main.service";
import { UnitGroup } from "../model/unit-group";

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

    this.cd.markForCheck();
  }
}
