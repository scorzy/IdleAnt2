import { Component, OnInit, OnDestroy } from "@angular/core";
import { MainService } from "./main.service";
import { World } from "./model/world";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  travelMessage = false;
  worldTravel: World;
  worldSub: any;

  constructor(public ms: MainService, private router: Router) {}

  ngOnInit(): void {
    this.ms.worldEmitter.subscribe(world => {
      this.worldTravel = world;
      this.travelMessage = true;
    });
  }
  ngOnDestroy(): void {
    this.worldSub.unsubscribe();
  }
  travel() {
    this.travelMessage = false;
    this.ms.game.goToWorld(this.worldTravel);
    this.router.navigateByUrl("/nav/unit/fo");
  }
}
