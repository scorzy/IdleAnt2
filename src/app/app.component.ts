import { Component, OnInit, OnDestroy } from "@angular/core";
import { MainService } from "./main.service";
import { World } from "./model/world";
import { Router } from "@angular/router";

// import { ClarityIcons } from "@clr/icons";
import { ClarityIcons } from "@clr/icons";

import {
  ClrShapeBug,
  ClrShapeWorld,
  ClrShapeClock
} from "@clr/icons/shapes/essential-shapes";

import {
  ClrShapeFlask,
  ClrShapeFloppy,
  ClrShapeInstall,
  ClrShapeUninstall
} from "@clr/icons/shapes/technology-shapes";
import { ClrShapeStore } from "@clr/icons/shapes/commerce-shapes";
import {
  ClrShapeExclamationTriangle,
  ClrShapeAngle,
  ClrShapeAngleDouble,
  ClrShapeInfoStandard
} from "@clr/icons/shapes/core-shapes";
import { ClrShapePause } from "@clr/icons/shapes/media-shapes";
import { ClrShapePaintRoller } from "@clr/icons/shapes/text-edit-shapes";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  travelMessage = false;
  worldTravel: World;
  worldSub: any;

  constructor(public ms: MainService, private router: Router) {
    ClarityIcons.add({
      bug: ClrShapeBug,
      flask: ClrShapeFlask,
      world: ClrShapeWorld,
      clock: ClrShapeClock,
      cog: ClrShapeStore,
      "exclamation-triangle": ClrShapeExclamationTriangle,
      "angle-double": ClrShapeAngleDouble,
      angle: ClrShapeAngle,
      pause: ClrShapePause,
      infoStandard: ClrShapeInfoStandard,
      floppy: ClrShapeFloppy,
      "paint-roller": ClrShapePaintRoller,
      install: ClrShapeInstall,
      uninstall: ClrShapeUninstall
    });
  }

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
