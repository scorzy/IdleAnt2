import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { MainService } from "../main.service";
import { ActivatedRoute } from "@angular/router";
import { PrestigeGroup } from "../model/prestige/prestige-group";
import { Prestige } from "../model/prestige/prestige";

@Component({
  selector: "app-prestige-group",
  templateUrl: "./prestige-group.component.html",
  styleUrls: ["./prestige-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class PrestigeGroupComponent implements OnInit, OnDestroy {
  paramsSub: any;
  prestigeGroup: PrestigeGroup;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(this.getGroup.bind(this));
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  getGroup(params: any) {
    let id = params.id;
    if (id === undefined) id = "fol";
    const grp = this.ms.game.allPrestige.prestigeGroups.find(g => g.id === id);
    this.prestigeGroup = !!grp
      ? grp
      : this.ms.game.allPrestige.prestigeGroups[0];
  }

  getPretId(index: number, prestige: Prestige) {
    return index + prestige.id;
  }
}
