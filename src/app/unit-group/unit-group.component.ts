import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
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
import { FullUnit } from "../model/full-unit";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-unit-group",
  templateUrl: "./unit-group.component.html",
  styleUrls: ["./unit-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class UnitGroupComponent implements OnInit, OnDestroy {
  paramsSub: any;
  sub: any;
  paramsSave: any;

  selected = new Array<FullUnit>();

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

  isSmall = false;

  stop = true;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getGroup.bind(this));
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.updateChart();
      this.cd.markForCheck();
    });
    this.isSmall = window.innerWidth < 1200;
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.sub.unsubscribe();
  }
  getGroup(params: any) {
    this.paramsSave = params;
    let id = "" + params.id;
    if (id === undefined) id = "0";
    this.unitGroup = this.ms.game.unitGroups.find(g => "" + g.id === id);

    if (!this.unitGroup) return;

    this.ms.game.lastUnitUrl = "nav/group/" + this.unitGroup.id;

    this.unitsSpan = this.unitGroup.unlocked
      .map(u => u.name)
      .reduce((p, c) => p + ", " + c);

    if (this.unitGroup.unlocked[0].buyAction) {
      this.hatchActionGrp = new ActionGroup(
        "Hatch",
        this.unitGroup.selected.filter(u => u.buyAction).map(u => u.buyAction),
        this.ms.game
      );
      if (this.ms.game.researches.team2.done) {
        this.team = true;
        this.teamActionGrp = new ActionGroup(
          "Teamwork",
          this.unitGroup.selected
            .filter(u => u.teamAction)
            .map(u => u.teamAction),
          this.ms.game
        );
      }
      if (this.ms.game.researches.twin.done) {
        this.twin = true;
        this.twinActionGrp = new ActionGroup(
          "Twin",
          this.unitGroup.selected
            .filter(u => u.twinAction)
            .map(u => u.twinAction),
          this.ms.game
        );
      }
    } else {
      this.hatchActionGrp = null;
    }
    this.doGraph();
    this.cd.markForCheck();
  }
  selectedChanged(event: any) {
    this.getGroup(this.paramsSave);
  }
  updateChart() {
    if (this.stop || !this.unitGroup) return;

    this.unitGroup.updateChart();
  }
  doGraph() {
    this.stop = true;
    this.unitGroup.updateChartLabel();

    setTimeout(() => {
      if (
        typeof this.chart !== "undefined" &&
        this.chart &&
        this.chart.chart &&
        this.chart.chart.config
      ) {
        this.chart.chart.options.tooltips.enabled = false;
        this.chart.data = this.unitGroup.chartData;
        this.chart.chart.config.data.labels = this.unitGroup.chartLabels;
        this.chart.chart.update();
        this.stop = false;
      }
    }, 1);
  }
}
