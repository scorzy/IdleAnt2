import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FullUnit } from "../model/full-unit";
import { Action } from "../model/action";
import { MainService } from "../main.service";
import { ProductionSorter, TotalProductionSorter } from "../model/utility";
import { Production } from "../model/production";
import { Malus } from "../model/malus";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitComponent implements OnInit, OnDestroy {
  @Input() unit: FullUnit;

  paramsSub: any;
  sub: any;
  malus: Malus;
  prodSorter = new ProductionSorter();
  totalProdSorter = new TotalProductionSorter();

  activeProduct = new Array<Production>();
  activeProducer = new Array<Production>();

  autoBuyModal = false;

  constructor(
    public ms: MainService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.ms.lastTab = 0;
  }

  ngOnInit() {
    // this.paramsSub = this.route.params.subscribe(this.getUnit.bind(this));
    this.sub = this.ms.updateEmitter.subscribe(() => this.cd.markForCheck());
  }
  ngOnDestroy() {
    // this.paramsSub.unsubscribe();
    this.sub.unsubscribe();
  }
  ngOnChanges() {
    this.getUnit();
  }
  getUnit() {
    if (this.unit instanceof FullUnit) {
      this.unit.isNew = false;
      if (this.unit instanceof Malus) {
        this.malus = this.unit;
      }

      this.activeProduct = this.unit.produces.filter(p => p.product.unlocked);
      this.activeProducer = this.unit.producedBy.filter(
        p => p.producer.unlocked
      );
      if (this.unit.buyAction) this.unit.buyAction.reloadUserPrices();
      if (this.unit.teamAction && this.ms.game.researches.team2.done)
        this.unit.teamAction.reloadUserPrices();
      if (this.unit.twinAction && this.ms.game.researches.twin.done)
        this.unit.twinAction.reloadUserPrices();
    }
    this.cd.markForCheck();
  }
  getActId(action: Action) {
    return action.id + this.unit.id;
  }
  openAutoBuyModal() {
    this.autoBuyModal = true;
  }
}
