import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { MainService } from "../../main.service";
import { ActionGroup } from "../../model/actions/action-group";
import { UnitGroup } from "../../model/unit-group";
import {
  UnitAutoHatchSorter,
  UnitAutoTeamSorter,
  UnitAutoTwinSorter
} from "../../model/utility";

@Component({
  selector: "app-group-auto-buy",
  templateUrl: "./group-auto-buy.component.html",
  styleUrls: ["./group-auto-buy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupAutoBuyComponent implements OnInit, OnDestroy {
  @Input()
  unitGroup: UnitGroup;
  sub: any;

  hatchActionGrp: ActionGroup;
  teamActionGrp: ActionGroup;
  twinActionGrp: ActionGroup;

  unitAutoHatchSorter = new UnitAutoHatchSorter();
  unitAutoTeamSorter = new UnitAutoTeamSorter();
  unitAutoTwinSorter = new UnitAutoTwinSorter();

  multiModal = false;
  reqMulti = 1;
  autoBuyType = "0";

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getGroup();
  }
  selectedChanged(event: any) {
    this.getGroup();
  }
  getGroup() {
    this.hatchActionGrp = null;
    this.teamActionGrp = null;
    this.twinActionGrp = null;

    if (this.unitGroup.unlocked[0].buyAction) {
      if (this.ms.game.allPrestige.autoBuyUnlock.autoBuyQuantity.done) {
        this.hatchActionGrp = new ActionGroup(
          "Hatch",
          this.unitGroup.selected
            .filter(u => u.buyAction)
            .map(u => u.buyAction)
            .filter(b => b.autoBuyer)
            .map(a => a.autoBuyer),
          this.ms.game
        );
        this.hatchActionGrp.actionList.forEach(a => a.reload());
        this.hatchActionGrp.reload(this.ms.game);
      }
      if (
        this.ms.game.allPrestige.autoBuyUnlock.autoBuyTeam.done &&
        this.unitGroup.unlocked[0].teamAction
      ) {
        this.teamActionGrp = new ActionGroup(
          "Teamwork",
          this.unitGroup.selected
            .filter(u => u.teamAction)
            .map(u => u.teamAction)
            .filter(b => b.autoBuyer)
            .map(a => a.autoBuyer),
          this.ms.game
        );
        this.teamActionGrp.actionList.forEach(a => a.reload());
        this.teamActionGrp.reload(this.ms.game);
      }
      if (
        this.ms.game.allPrestige.autoBuyUnlock.autoBuyTwin.done &&
        this.unitGroup.unlocked[0].twinAction
      ) {
        this.twinActionGrp = new ActionGroup(
          "Twin",
          this.unitGroup.selected
            .filter(u => u.twinAction)
            .map(u => u.twinAction)
            .filter(b => b.autoBuyer)
            .map(a => a.autoBuyer),
          this.ms.game
        );
        this.twinActionGrp.actionList.forEach(a => a.reload());
        this.twinActionGrp.reload(this.ms.game);
      }
    } else {
      this.hatchActionGrp = null;
      this.teamActionGrp = null;
      this.twinActionGrp = null;
    }
  }
  reload() {
    this.ms.game.autoBuyManager.buildActiveList();
  }
  allOn(status = true) {
    this.unitGroup.unlocked.forEach(u => {
      if (u.buyAction && u.buyAction.autoBuyer) {
        u.buyAction.autoBuyer.active = status;
      }
      if (u.teamAction && u.teamAction.autoBuyer) {
        u.teamAction.autoBuyer.active = status;
      }
      if (u.twinAction && u.twinAction.autoBuyer) {
        u.twinAction.autoBuyer.active = status;
      }
    });
    this.reload();
  }
  setMulti(all = true) {
    if (this.reqMulti <= 1 && this.reqMulti > 0) {
      const selection = all ? this.unitGroup.unlocked : this.unitGroup.selected;
      selection.forEach(u => {
        switch (this.autoBuyType) {
          case "0": {
            u.buyAction.autoBuyer.priceSavePercent = this.reqMulti;
            u.teamAction.autoBuyer.priceSavePercent = this.reqMulti;
            u.twinAction.autoBuyer.priceSavePercent = this.reqMulti;
            break;
          }
          case "1": {
            u.buyAction.autoBuyer.priceSavePercent = this.reqMulti;
            break;
          }
          case "2": {
            u.teamAction.autoBuyer.priceSavePercent = this.reqMulti;
            break;
          }
          case "3": {
            u.twinAction.autoBuyer.priceSavePercent = this.reqMulti;
            break;
          }
        }
      });
    }

    this.multiModal = false;
  }
}
