import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from "@angular/core";
import { MainService } from "../../main.service";
import { RunExpPerSecSorter, RunExpSorter } from "../../model/utility";
declare let Chart;

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class StatsComponent implements AfterViewInit {
  runExpSorter = new RunExpSorter();
  runExpPerSecSorter = new RunExpPerSecSorter();
  @ViewChild("chart")
  chartRef: ElementRef;
  chart: any;

  constructor(public ms: MainService) {}

  ngAfterViewInit() {
    const chartCtx = this.chartRef.nativeElement.getContext("2d");
    const totalExp = this.ms.game.stats.runs
      .map(r => r.experience)
      .reduce((a, b) => a.plus(b), new Decimal(0))
      .max(1);
    const totalTime = Math.max(
      this.ms.game.stats.runs
        .map(r => r.endDate.getTime() - r.startDate.getTime())
        .reduce((a, b) => a + b, 0),
      1
    );

    this.chart = new Chart(chartCtx, {
      type: "bar",
      data: {
        labels: this.ms.game.stats.runs.map(r => r.worldName),
        datasets: [
          {
            label: "Experience %",
            data: this.ms.game.stats.runs.map(r => r.experience.div(totalExp)),
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 0
          },
          {
            label: "Time spent %",
            data: this.ms.game.stats.runs.map(
              r => (r.endDate.getTime() - r.startDate.getTime()) / totalTime
            ),
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: "rgba(54, 162, 235, 0.3)",
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
}
