import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
  ElementRef
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
declare let Chart;

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

  operativity = 100;

  // @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild("chart") chartRef: ElementRef;
  chart: any;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (!this.unitGroup) this.unitGroup = this.ms.game.unitGroups[0];
    this.unitGroup.updateChart();

    const chartCtx = this.chartRef.nativeElement.getContext("2d");

    Chart.defaults.global.tooltips.enabled = false;
    this.chart = new Chart(chartCtx, {
      type: "pie",
      data: {
        labels: this.unitGroup.chartLabels,
        datasets: [
          {
            data: this.unitGroup.chartData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(255, 206, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(153, 102, 255, 0.3)",
              "rgba(255, 159, 64, 0.3)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

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
    if (!this.unitGroup) this.unitGroup = this.ms.game.unitGroups[0];
    if (!this.unitGroup) return;

    this.ms.game.lastUnitUrl = "nav/group/" + this.unitGroup.id;

    this.unitsSpan = this.unitGroup.unlocked
      .map(u => u.name)
      .reduce((p, c) => p + ", " + c);

    if (this.unitGroup.unlocked[0].buyAction) {
      this.operativity =
        this.unitGroup.selected.length > 0
          ? this.unitGroup.selected
              .map(u => u.efficiency)
              .reduce((p, c) => p + c, 0) / this.unitGroup.selected.length
          : 0;

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
      this.teamActionGrp = null;
      this.twinActionGrp = null;
    }
    // this.doGraph();
    this.cd.markForCheck();
  }
  selectedChanged(event: any) {
    this.getGroup(this.paramsSave);
  }
  updateChart() {
    if (this.stop || !this.unitGroup) return;
    const lastData = this.unitGroup.chartData;
    this.unitGroup.updateChart();
    if (lastData !== this.unitGroup.chartData) this.doGraph();
  }
  doGraph() {
    this.stop = true;
    this.unitGroup.updateChartLabel();

    if (typeof this.chart !== "undefined" && this.chart) {
      this.chart.data.datasets[0].data = this.unitGroup.chartData;
      this.chart.data.labels = this.unitGroup.chartLabels;
      this.chart.update();
    }
    this.stop = false;
  }
  changeOperativity(event: any) {
    this.unitGroup.selected.forEach(u => (u.efficiency = this.operativity));
  }
}
