import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { Network } from "vis";
import { MainService } from "../main.service";
import { Mastery, MasteryTypes } from "../model/masteries/mastery";

@Component({
  selector: "app-mastery",
  templateUrl: "./mastery.component.html",
  styleUrls: ["./mastery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class MasteryComponent implements AfterViewInit, OnInit {
  @ViewChild("network")
  networkDiv: ElementRef;
  networkVis: any; // Network;
  list = new Array<string>();
  node: any;
  exp = "";

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  rebuildList() {
    this.list = [];
    const lenght = Object.keys(MasteryTypes).length / 2;
    for (let i = 0; i < lenght; i++) {
      const sum = this.ms.game.allMateries.getSum(i);
      if (sum > 0) {
        const desc = Mastery.getDescription(i, sum);
        this.list.push(desc);
      }
    }
  }
  ngOnInit() {
    this.rebuildList();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const myNodes: any = this.ms.game.allMateries.visMasteries;
      const myEedges: any = this.ms.game.allMateries.visEdge;
      this.networkVis = new Network(
        this.networkDiv.nativeElement,
        {
          nodes: myNodes,
          edges: myEedges
        },
        {
          nodes: { borderWidth: 2 },
          edges: {
            smooth: {
              enabled: true,
              type: "dynamic",
              roundness: 0.5
            }
          },
          interaction: { hover: true },
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -6900,
              avoidOverlap: 0.0
            },
            minVelocity: 1
          }
        }
      );
      this.networkVis.on("click", params => {
        const masteryBuy = params.nodes[0];

        this.node =
          masteryBuy || masteryBuy === 0
            ? this.ms.game.allMateries.visMasteries.get(masteryBuy)
            : null;

        this.cd.markForCheck();
      });
    }, 0);
  }
  getDescId(index: number, desc: string) {
    return index + desc;
  }
  buyMastery() {
    if (this.ms.game.allMateries.buy(this.node.id)) {
      this.ms.game.setMaxTimeBank();
      this.node = null;
      this.rebuildList();
    }
  }

  export() {
    this.networkVis.storePositions();
    this.exp = JSON.stringify(this.networkVis.getPositions());
  }
}
