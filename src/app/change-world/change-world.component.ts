import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { World } from "../model/world";
@Component({
  selector: "app-change-world",
  templateUrl: "./change-world.component.html",
  styleUrls: ["./change-world.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeWorldComponent implements OnInit {
  maxSafeInt = Number.MAX_SAFE_INTEGER;
  minLevel = new Decimal(1);
  maxLevel = new Decimal(1);
  rangeValues: number[] = [1, Number.MAX_SAFE_INTEGER];

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.setLevels();
      this.cd.markForCheck();
    }, 0);
  }
  setLevels() {
    this.maxLevel = this.ms.game.maxLevel
      .times(this.rangeValues[1] / Number.MAX_SAFE_INTEGER)
      .ceil();
    this.minLevel = this.ms.game.maxLevel
      .times(this.rangeValues[0] / Number.MAX_SAFE_INTEGER)
      .floor()
      .min(this.maxLevel)
      .max(1);
  }

  getWorldId(index: number, world: World) {
    return world.name + world.level + index;
  }
  randomize() {
    this.ms.game.generateWorlds(this.minLevel, this.maxLevel);
  }
}
