import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../main.service";
import { World } from "../model/world";
@Component({
  selector: "app-change-world",
  templateUrl: "./change-world.component.html",
  styleUrls: ["./change-world.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeWorldComponent implements OnInit, AfterViewInit {
  maxSafeInt = Number.MAX_SAFE_INTEGER;
  minLevel = new Decimal(1);
  maxLevel = new Decimal(1);
  rangeValues: number[] = [1, Number.MAX_SAFE_INTEGER];
  travelMessage = false;
  worldTravel: World;
  worldSub: any;

  constructor(
    public ms: MainService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.ms.game.reloadMaxLevel();
  }

  ngAfterViewInit(): void {
    this.cd.markForCheck();
  }

  ngOnInit() {
    this.setLevels();
    this.worldSub = this.ms.worldEmitter.subscribe(world => {
      this.worldTravel = world;
      this.travelMessage = true;
    });
  }
  setLevels() {
    this.maxLevel = this.ms.game.realMaxLevel
      .times(this.rangeValues[1] / Number.MAX_SAFE_INTEGER)
      .ceil();
    this.minLevel = this.ms.game.realMaxLevel
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
  ngOnDestroy(): void {
    this.worldSub.unsubscribe();
  }
  travel() {
    this.travelMessage = false;
    this.ms.game.goToWorld(this.worldTravel);
    this.router.navigateByUrl("/");
  }
}
