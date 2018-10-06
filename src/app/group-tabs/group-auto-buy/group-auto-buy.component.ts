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
      }
    } else {
      this.hatchActionGrp = null;
      this.teamActionGrp = null;
      this.twinActionGrp = null;
    }
  }
}
