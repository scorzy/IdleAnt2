import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../main.service";
import { UnitGroup } from "../model/unit-group";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() lab = false;
  @Input() labBadge = false;

  @Input() travel = false;
  @Input() travelBadge = false;

  @Input() prestige = false;

  sub: any;
  subGroup: any;
  headerClass = "header-6";
  timeModal = false;

  percentPreset = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
  minuteWarps = [1, 5, 10, 20, 30, 60, 90, 120, 240];
  groupNoEnemy = new Array<UnitGroup>();
  buyMulti = 0;

  constructor(
    private router: Router,
    public ms: MainService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.ms.options.headerEmitter.subscribe(() => {
      this.reloadHeader();
      this.cd.markForCheck();
    });
    this.subGroup = this.ms.game.unlockGroupEmiter.subscribe(() => {
      this.reloadHeader();
      this.cd.markForCheck();
    });
    this.reloadHeader();
    this.cd.markForCheck();
  }
  reloadHeader() {
    this.headerClass = "header-" + this.ms.options.header;
    this.groupNoEnemy = this.ms.game.unlockedGroups.filter(
      g => g !== this.ms.game.worldMalus && g !== this.ms.game.materials
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subGroup.unsubscribe();
  }
  navigateLast() {
    this.router.navigateByUrl(this.ms.game.lastUnitUrl);
  }
  openTimeModal() {
    this.ms.game.actHour.reload();
    this.ms.game.actMin.reload();
    this.timeModal = true;
  }

  all100() {
    this.ms.game.unlockedUnits.forEach(u => {
      u.efficiency = 100;
    });
    this.ms.efficiencyEmitter.emit(100);
  }
  warp(minute: number) {
    this.ms.game.actMin.buy(new Decimal(minute));
  }
  allCustom(eff: number, list: UnitGroup) {
    list.allCustom(eff);
    this.ms.efficiencyEmitter.emit(eff);
  }
  getListId(index, list: UnitGroup) {
    return list.name;
  }
}
