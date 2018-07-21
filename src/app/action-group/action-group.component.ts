import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { ActionGroup } from "../model/actions/action-group";
import { Price } from "../model/price";

@Component({
  selector: "app-action-group",
  templateUrl: "./action-group.component.html",
  styleUrls: ["./action-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionGroupComponent implements OnInit {
  @Input() actGr: ActionGroup;
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.actGr.reload(this.ms.game);
      // this.actGr.reloadAvailableTime();
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  buy(event: Event) {
    this.actGr.buy(this.ms.game, this.actGr.realNum);
  }

  getPriceId(index, price: Price) {
    return price.base.id;
  }
}
