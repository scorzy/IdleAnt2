import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
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

  sub: any;
  headerClass = "header-6";

  constructor(
    private router: Router,
    public ms: MainService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.ms.options.headerEmitter.subscribe(() => {
      this.reloadHeade();
      this.cd.markForCheck();
    });
    this.reloadHeade();
    this.cd.markForCheck();
  }
  reloadHeade() {
    this.headerClass = "header-" + this.ms.options.header;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  navigateLast() {
    this.router.navigateByUrl(this.ms.game.lastUnitUrl);
  }
}
