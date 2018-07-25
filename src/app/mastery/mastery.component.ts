import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { Data, Network } from "vis";
import { ChangeWorldComponent } from "../change-world/change-world.component";
import { MainService } from "../main.service";

@Component({
  selector: "app-mastery",
  templateUrl: "./mastery.component.html",
  styleUrls: ["./mastery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class MasteryComponent implements AfterViewInit {
  @ViewChild("network") networkDiv: ElementRef;
  networkVis: Network;

  constructor(public ms: MainService) {
    //
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.networkVis = new Network(
        this.networkDiv.nativeElement,
        {
          nodes: this.ms.game.allMateries.visMasteries,
          edges: this.ms.game.allMateries.visEdge
        },
        {
          nodes: { borderWidth: 2 },
          interaction: { hover: true }
        }
      );
      this.networkVis.on("click", params => {
        this.ms.game.allMateries.buy(params.nodes[0]);
      });
    }, 0);
  }
}
