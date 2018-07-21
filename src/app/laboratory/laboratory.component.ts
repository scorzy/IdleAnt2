import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { Research } from "../model/research";

@Component({
  selector: "app-laboratory",
  templateUrl: "./laboratory.component.html",
  styleUrls: ["./laboratory.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-container]": "true"
  }
})
export class LaboratoryComponent implements OnInit {
  resDone = false;
  resList: Research[];
  sub: any;

  constructor(public ms: MainService) {}

  ngOnInit() {
    this.changeList();
    this.sub = this.ms.researchEmitter.subscribe(m => this.changeList());
    this.ms.game.researches.toDo.forEach(r => {
      // r.reloadUserPrices();
      r.reloadAvailableTime();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  changeList() {
    this.resList = this.resDone
      ? this.ms.game.researches.done
      : this.ms.game.researches.toDo;
  }
  getRestId(index, res: Research) {
    return res.id;
  }
}
