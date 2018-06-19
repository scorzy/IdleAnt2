import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";

@Component({
  selector: "app-material-nav",
  templateUrl: "./material-nav.component.html",
  styleUrls: ["./material-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.subnav]": "true",
    "[class.matTab]": "true"
  }
})
export class MaterialNavComponent implements OnInit, OnDestroy {
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.sub = this.ms.updateEmitter.subscribe(m => {
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getUnitId(index, base: BaseUnit) {
    return base.id;
  }
}
