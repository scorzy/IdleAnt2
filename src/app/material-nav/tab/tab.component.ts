import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  @Input() id = "";
  @Input() isEnding = false;
  @Input() name = "";
  @Input() quantity = new Decimal(0);
  @Input() perSec = new Decimal(0);
  constructor() {
    //
  }

  ngOnInit() {
    //
  }
}
