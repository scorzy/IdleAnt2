import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { World } from "../model/world";
import { Price } from "../model/price";
import { BaseUnit } from "../model/baseUnit";
import { Research } from "../model/research";
import { FullUnit } from "../model/full-unit";

@Component({
  selector: "app-world",
  templateUrl: "./world.component.html",
  styleUrls: ["./world.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldComponent implements OnInit {
  @Input() world: World;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  getBonusId(index, bonus: [BaseUnit, Decimal]) {
    return bonus[0].id + bonus[1].toNumber();
  }
  getResearchId(index, resarch: Research) {
    return resarch.id;
  }
  getStartId(index, bonus: [FullUnit, Decimal]) {
    return bonus[0].id + bonus[1].toNumber();
  }
}
