import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../main.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() lab = false;
  @Input() travel = false;
  @Input() travelBadge = false;

  constructor(private router: Router, public ms: MainService) {}

  ngOnInit() {
    //
  }
  navigateLast() {
    this.router.navigateByUrl(this.ms.game.lastUnitUrl);
  }
}
