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
import { World } from "../model/world";

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
  @ViewChild("network", { static: true })
  networkDiv: ElementRef;
  networkVis: any; // Network;
  list = new Array<string>();
  node: any;
  exp = "";
  showReset = false;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  rebuildList() {
    this.list = [];
    const length = Object.keys(MasteryTypes).length / 2;
    for (let i = 0; i < length; i++) {
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
          interaction: { dragNodes: false, hover: true },
          physics: {
            enabled: false,
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
  reset() {
    this.ms.game.allMateries.reset();
    this.rebuildList();
    this.cd.markForCheck();

    const baseWorld = new World("base");
    baseWorld.setLevel(new Decimal(1), this.ms.game);
    this.ms.game.generateWorlds();
    baseWorld.name = "Home World";
    this.ms.game.canTravel = false;
    this.ms.game.goToWorld(baseWorld);

    this.showReset = false;
  }
}
