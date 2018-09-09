import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { PrestigeGroup } from "../model/prestige/prestige-group";
declare let preventScroll;
@Component({
  selector: "app-prestige-nav",
  templateUrl: "./prestige-nav.component.html",
  styleUrls: ["./prestige-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class PrestigeNavComponent implements OnInit, AfterViewInit {
  constructor(public ms: MainService) {
    //
  }
  ngAfterViewInit(): void {
    if (typeof preventScroll === typeof Function) preventScroll();
  }
  ngOnInit() {
    //
  }
  getGroupId(index: number, group: PrestigeGroup) {
    return index + group.list[0].id;
  }
}
