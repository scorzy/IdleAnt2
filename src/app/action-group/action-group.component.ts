import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { ActionGroup } from "../model/actions/action-group";
import { Price } from "../model/price";
import { MainService } from "../main.service";

@Component({
  selector: "app-action-group",
  templateUrl: "./action-group.component.html",
  styleUrls: ["./action-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionGroupComponent implements OnInit {
  @Input() actGr: ActionGroup;
  sub: any;

  constructor(private ms: MainService, private cd: ChangeDetectorRef) {
    //Nothing
  }

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(() => {
      this.actGr.reload();
      // this.actGr.reloadAvailableTime();
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPriceId(index, price: Price) {
    return price.base.id;
  }
}
