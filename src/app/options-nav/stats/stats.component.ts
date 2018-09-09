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
declare let preventScroll;

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
    if (typeof preventScroll === typeof Function) preventScroll();
    setTimeout(() => {
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
      const reverseRun = this.ms.game.stats.runs.slice().reverse();

      this.chart = new Chart(chartCtx, {
        type: "bar",
        data: {
          labels: reverseRun.map(r => r.worldName),
          datasets: [
            {
              label: "Experience %",
              data: reverseRun.map(r =>
                Math.floor(r.experience.div(totalExp).toNumber() * 100)
              ),
              backgroundColor: "rgba(255, 99, 132, 0.3)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 0
            },
            {
              label: "Time spent %",
              data: reverseRun.map(r =>
                Math.floor(
                  ((r.endDate.getTime() - r.startDate.getTime()) * 100) /
                    totalTime
                )
              ),
              backgroundColor: "rgba(54, 162, 235, 0.3)",
              borderColor: "rgba(54, 162, 235, 0.3)",
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scaleShowValues: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  autoSkip: false
                }
              }
            ]
          }
        }
      });
    }, 0);
  }
}
