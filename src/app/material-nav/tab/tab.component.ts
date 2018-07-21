import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../../main.service";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, OnDestroy {
  @Input() id = "";
  @Input() isEnding = false;
  @Input() name = "";
  @Input() quantity = new Decimal(0);
  @Input() perSec = new Decimal(0);
  formatSub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {
    //
  }

  ngOnInit() {
    this.formatSub = this.ms.options.formatEmitter.subscribe(m => {
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.formatSub.unsubscribe();
  }
}
