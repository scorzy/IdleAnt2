import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MainService } from "../../main.service";
import { Research } from "../../model/research";

@Component({
  selector: "app-lab-menu",
  templateUrl: "./lab-menu.component.html",
  styleUrls: ["./lab-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabMenuComponent implements OnInit {
  constructor(public ms: MainService) {}

  ngOnInit() {
    //
  }
  getResearchArray(repeating = true): Research[] {
    let toDo = this.ms.game.researches.toDo;
    toDo = repeating
      ? toDo.filter(r => !r.unlimited || r.quantity.lt(r.maxAutoBuyLevel))
      : toDo.filter(r => !r.unlimited);

    toDo.forEach(r => {
      r.reload();
      r.reloadUserPrices();
    });

    return toDo.sort((r1, r2) =>
      r1.prices[0].priceUser.cmp(r2.prices[0].priceUser)
    );
  }
  buy1(rep = true) {
    const res = this.getResearchArray(rep);
    if (res.length > 0) res[0].buy();
  }
  buyMulti(rep = true): boolean {
    const res = this.getResearchArray(rep);
    const len = res.length;
    let ret = false;
    for (let i = 0; i < len; i++) {
      if (res[i].buy()) ret = true;
      else break;
    }
    return ret;
  }
  buyMultiR(rep = true) {
    while (this.buyMulti(rep));
  }
}
