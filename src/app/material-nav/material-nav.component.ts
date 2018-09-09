import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";
declare let preventScroll;

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
export class MaterialNavComponent implements OnInit, OnDestroy, AfterViewInit {
  sub: any;

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
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
