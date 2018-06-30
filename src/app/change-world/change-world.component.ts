import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MainService } from "../main.service";
import { World } from "../model/world";
@Component({
  selector: "app-change-world",
  templateUrl: "./change-world.component.html",
  styleUrls: ["./change-world.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeWorldComponent implements OnInit {
  constructor(public ms: MainService) {}

  ngOnInit() {
    //
  }

  getWorldId(index: number, world: World) {
    return world.name + world.level + index;
  }
}
