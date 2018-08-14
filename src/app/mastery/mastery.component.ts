import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { Data, Network } from "vis";
import { ChangeWorldComponent } from "../change-world/change-world.component";
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
  @ViewChild("network") networkDiv: ElementRef;
  networkVis: Network;
  list = new Array<string>();

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
        if (this.ms.game.allMateries.buy(params.nodes[0])) {
          this.rebuildList();
          this.cd.markForCheck();
        }
      });
    }, 0);
  }
  getDescId(index: number, desc: string) {
    return index + desc;
  }
}
