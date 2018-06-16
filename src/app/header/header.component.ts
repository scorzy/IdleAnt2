import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from "../main.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() lab = false;

  constructor(private router: Router, private ms: MainService) {}

  ngOnInit() {
    //
  }
  navigateLast() {
    this.router.navigateByUrl(this.ms.game.lastUnitUrl);
  }
}
