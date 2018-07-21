import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { MainService } from "../main.service";
import { BaseUnit } from "../model/baseUnit";
import { FullUnit } from "../model/full-unit";
import { Price } from "../model/price";
import { Research } from "../model/research";
import { World } from "../model/world";

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
