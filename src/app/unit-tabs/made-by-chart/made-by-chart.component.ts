import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { MainService } from "../../main.service";
import { CONSTS } from "../../model/CONSTANTS";
import { FullUnit } from "../../model/full-unit";
declare let Chart;

@Component({
  selector: "app-made-by-chart",
  templateUrl: "./made-by-chart.component.html",
  styleUrls: ["./made-by-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MadeByChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  unit: FullUnit;
  @Input()
  consumers = false;

  @ViewChild("chart")
  chartRef: ElementRef;
  @ViewChild("pieContainer")
  pieContainerRef: ElementRef;
  chart: any;
  sub: any;
  title = "";

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => this.updateData);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnChanges() {
    this.title =
      (this.consumers ? "Consumer" : "Producers") + " % of " + this.unit.name;
    this.updateData();
  }

  ngAfterViewInit() {
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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: CONSTS.CHART_COLORS.backgroundColor,
            borderColor: CONSTS.CHART_COLORS.borderColor,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "right" }
      }
    });
    this.updateData();
  }

  updateData() {
    if (!this.chart) return;

    const activeProducer = this.unit.producedBy.filter(
      p =>
        p.producer.unlocked &&
        p.producer.quantity.gt(0) &&
        ((!this.consumers && p.ratio.gt(0)) ||
          (this.consumers && p.ratio.lt(0)))
    );

    const labels = activeProducer.map(p => p.producer.name);
    if (this.chart.data.labels.length !== labels.length) {
      this.chart.data.labels = labels;
    }
    const total = activeProducer
      .map(p => p.prodPerSec.times(p.producer.quantity))
      .reduce((p, n) => p.plus(n), new Decimal(0));

    const data = activeProducer.map(p =>
      Math.floor(
        p.prodPerSec
          .times(p.producer.quantity)
          .div(total)
          .toNumber() * 100
      )
    );

    if (data.length !== this.chart.data.datasets[0].data) {
      this.chart.data.datasets[0].data = data;
      this.chart.update();
      this.cd.markForCheck();
    } else {
      const len = data.length;
      let i = 0;
      for (i = 0; i < len; i++) {
        if (data[i] !== this.chart.data.datasets[0].data) break;
      }
      if (i < len) {
        this.chart.data.datasets[0].data = data;
        this.chart.update();
        this.cd.markForCheck();
      }
    }
  }
}
