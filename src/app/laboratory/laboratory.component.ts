import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { Research } from "../model/research";

@Component({
  selector: "app-laboratory",
  templateUrl: "./laboratory.component.html",
  styleUrls: ["./laboratory.component.scss"],
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
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  changeList() {
    this.resList = this.resDone
      ? this.ms.game.researchs.done
      : this.ms.game.researchs.toDo;
  }
  getRestId(index, res: Research) {
    return res.id;
  }
}
