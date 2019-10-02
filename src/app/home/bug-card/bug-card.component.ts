import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { MainService } from "../../main.service";
import { BUGS, BugTypes } from "../../model/bugsTypes";
import { STRINGS } from "../../model/strings";
declare let Chart;

@Component({
  selector: "app-bug-card",
  templateUrl: "./bug-card.component.html",
  styleUrls: ["./bug-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.card]": "true"
  }
})
export class BugCardComponent implements OnInit {
  @Input()
  bug: BugTypes;

  @ViewChild("radar", { static: true })
  chartRef: ElementRef;
  @ViewChild("container", { static: true })
  containerRef: ElementRef;
  chart: any;

  constructor(public ms: MainService) {
    //Nothing
  }

  ngOnInit() {
    //
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.chartRef.nativeElement.width = this.containerRef.nativeElement.clientWidth;
      this.chartRef.nativeElement.height = this.containerRef.nativeElement.clientHeight;
      const canvas = this.chartRef.nativeElement;
      canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);

      Chart.defaults.global.tooltips.enabled = true;
      Chart.defaults.scale.ticks.beginAtZero = true;
      Chart.defaults.scale.ticks.display = false;

      const chartCtx = this.chartRef.nativeElement.getContext("2d");

      this.chart = new Chart(chartCtx, {
        type: "radar",
        data: {
          labels: [
            "Price",
            "Production",
            "Efficiency",
            "Team Price",
            "Twin Price"
          ],
          datasets: this.ms.game.currentWorld.additionalBugs.map(b =>
            this.genDataset(b)
          )
        },
        options: {
          maintainAspectRatio: true,
          legend: { position: "right" }
        }
      });
    }, 0);
  }

  genDataset(bug: BugTypes): any {
    const bugClass = BUGS[bug];

    const dataset = {
      backgroundColor: bugClass.color + "80",
      borderColor: bugClass.color,
      data: [
        1 / bugClass.priceMulti,
        bugClass.prodMulti,
        bugClass.efficiencyMulti,
        1 / bugClass.teamPriceMulti,
        1 / bugClass.twinPriceMulti
      ],
      label: STRINGS.bug[bug]
    };
    return dataset;
  }
}
