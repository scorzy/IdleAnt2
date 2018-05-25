import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  host: {
    "[class.content-container]": "true"
  }
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
