import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";

@Component({
  selector: "app-name",
  templateUrl: "./name.component.html",
  styleUrls: ["./name.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameComponent implements OnInit {
  @Input()
  name = "";
  @Input()
  unlimited = false;
  @Input()
  quantity = new Decimal(0);

  constructor() {
    //
  }

  ngOnInit() {
    //
  }
}
