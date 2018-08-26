import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";
import { FullUnit } from "../model/full-unit";
import { Malus } from "../model/malus";
import { Price } from "../model/price";
import { Research } from "../model/research";
import { STRINGS } from "../model/strings";
import { World } from "../model/world";
import { BugTypes } from "../model/bugsTypes";

@Component({
  selector: "app-world",
  templateUrl: "./world.component.html",
  styleUrls: ["./world.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.card]": "true",
    "[class.clickable]": "cantTravel"
  }
})
export class WorldComponent implements OnInit {
  @Input()
  world: World;
  @Input()
  cantTravel = true;

  travelMessage = false;

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    //
  }

  openModal() {
    if (this.cantTravel) this.ms.worldEmitter.emit(this.world);
  }
  getBugName(bug: BugTypes) {
    return bug in STRINGS.bug ? STRINGS.bug[bug] : "";
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
  getWinId(index, price: Price) {
    return index + price.base.id + price.price.toString();
  }
  getMalusId(index, malus: Malus) {
    return index + malus.id;
  }
  getBugId(index, bug: BugTypes) {
    return index + bug;
  }
}
