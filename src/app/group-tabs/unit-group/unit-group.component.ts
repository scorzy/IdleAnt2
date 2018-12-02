import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MainService } from "../../main.service";
import { ActionGroup } from "../../model/actions/action-group";
import { CONSTS } from "../../model/CONSTANTS";
import { FullUnit } from "../../model/full-unit";
import { UnitGroup } from "../../model/unit-group";
import {
  UnitBoughtSorter,
  UnitQuantitySorter,
  UnitTeamSorter,
  UnitTwinSorter
} from "../../model/utility";
declare let Chart;

@Component({
  selector: "app-unit-group",
  templateUrl: "./unit-group.component.html",
  styleUrls: ["./unit-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitGroupComponent implements OnInit, OnDestroy, OnChanges {
  sub: any;
  subSelected: any;
  subEff: any;
  paramsSave: any;

  selected = new Array<FullUnit>();

  @Input()
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

  operativity = 100;

  @ViewChild("chart")
  chartRef: ElementRef;
  @ViewChild("pieContainer")
  pieContainerRef: ElementRef;
  chart: any;
  forceChange = false;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.forceChange = true;
    this.getGroup();
  }

  ngAfterViewInit() {
    if (!this.unitGroup) this.unitGroup = this.ms.game.unitGroups[0];
    this.unitGroup.updateChartLabel();

    setTimeout(this.initChart.bind(this), 0.1);
  }

  initChart() {
    this.chartRef.nativeElement.width = this.pieContainerRef.nativeElement.clientWidth;
    this.chartRef.nativeElement.height = this.pieContainerRef.nativeElement.clientHeight;
    const canvas = this.chartRef.nativeElement;
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);

    Chart.defaults.global.tooltips.enabled = false;
    const chartCtx = this.chartRef.nativeElement.getContext("2d");

    this.chart = new Chart(chartCtx, {
      type: "pie",
      data: {
        labels: [], // this.unitGroup.chartLabels,
        datasets: [
          {
            data: [], // this.unitGroup.chartData,
            backgroundColor: CONSTS.CHART_COLORS.backgroundColor,
            borderColor: CONSTS.CHART_COLORS.borderColor,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }

  ngOnInit() {
    this.isSmall = window.innerWidth < 1200;
    this.getOperativity();
    this.subSelected = this.ms.selectedEmitter.subscribe(m => {
      this.getGroup();
      this.cd.markForCheck();
    });
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.updateChart();
      this.getOperativity();
      this.cd.markForCheck();
    });
    this.subEff = this.ms.efficiencyEmitter.subscribe(e => {
      this.operativity = e;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subEff.unsubscribe();
    this.subSelected.subEff.unsubscribe();
  }
  getOperativity() {
    if (this.unitGroup.unlocked[0].buyAction) {
      this.operativity =
        this.unitGroup.selected.length > 0
          ? this.unitGroup.selected
              .map(u => u.efficiency)
              .reduce((p, c) => p + c, 0) / this.unitGroup.selected.length
          : 0;
    }
  }
  getGroup() {
    this.unitsSpan = this.unitGroup.unlocked
      .map(u => u.name)
      .reduce((p, c) => p + ", " + c);

    this.hatchActionGrp = null;
    this.teamActionGrp = null;
    this.twinActionGrp = null;

    if (this.unitGroup.unlocked[0].buyAction) {
      this.hatchActionGrp = new ActionGroup(
        "Hatch",
        this.unitGroup.selected.filter(u => u.buyAction).map(u => u.buyAction),
        this.ms.game
      );
      if (
        this.ms.game.researches.team2.done &&
        this.unitGroup.unlocked[0].teamAction
      ) {
        this.team = true;
        this.teamActionGrp = new ActionGroup(
          "Teamwork",
          this.unitGroup.selected
            .filter(u => u.teamAction)
            .map(u => u.teamAction),
          this.ms.game
        );
      }
      if (
        this.ms.game.researches.twin.done &&
        this.unitGroup.unlocked[0].twinAction
      ) {
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
    this.getGroup();
  }
  updateChart() {
    if (!this.unitGroup) return;
    const lastData = this.unitGroup.chartData;
    this.unitGroup.updateChart();
    if (
      this.forceChange ||
      lastData !== this.unitGroup.chartData ||
      (this.chart &&
        this.chart.data &&
        this.chart.data.datasets[0] &&
        this.chart.data.datasets[0].data.length === 0) ||
      (this.chart &&
        this.chart.labels &&
        this.chart.labels[0] !== this.unitGroup.chartLabels[0])
    ) {
      this.doGraph();
      this.forceChange = false;
    }
  }
  doGraph() {
    this.unitGroup.updateChartLabel();

    if (typeof this.chart !== "undefined" && this.chart) {
      this.chart.data.datasets[0].data = this.unitGroup.chartData;
      this.chart.data.labels = this.unitGroup.chartLabels;
      this.chart.update();
    }
  }
  changeOperativity(event: any) {
    this.unitGroup.selected.forEach(u => (u.efficiency = this.operativity));
  }
}
