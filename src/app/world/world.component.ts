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
import { MainService } from "../main.service";

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
  @Input() world: World;
  @Input() cantTravel = true;

  travelMessage = false;

  constructor(public ms: MainService) {
    //
  }

  ngOnInit() {
    //
  }

  openModal() {
    this.ms.worldEmitter.emit(this.world);
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
