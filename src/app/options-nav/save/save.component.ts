import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
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
export class SaveComponent implements OnInit, OnDestroy {
  clearModal = false;
  exp = "";
  saveSub: any;

  constructor(public serv: MainService, private cd: ChangeDetectorRef) {
    //Nothig
  }

  ngOnInit() {
    this.saveSub = this.serv.saveEmitter.subscribe(s => this.cd.markForCheck());
  }
  ngOnDestroy(): void {
    this.saveSub.unsubscribe();
  }
  export() {
    this.exp = this.serv.getSave();
  }
  import() {
    this.serv.import(this.exp.trim());
  }
}
