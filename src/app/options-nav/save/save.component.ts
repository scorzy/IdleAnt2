import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MainService } from "../../main.service";

@Component({
  selector: "app-save",
  templateUrl: "./save.component.html",
  styleUrls: ["./save.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.content-area]": "true"
  }
})
export class SaveComponent implements OnInit {
  clearModal = false;
  exp = "";

  constructor(public serv: MainService) {
    //Nothig
  }

  ngOnInit() {
    //Nothig
  }

  export() {
    this.exp = this.serv.getSave();
  }
  import() {
    this.serv.import(this.exp.trim());
  }
}
