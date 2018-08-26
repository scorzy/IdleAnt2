import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "./main.service";
import { World } from "./model/world";

// import { ClarityIcons } from "@clr/icons";
import { ClarityIcons } from "@clr/icons";

import {
  ClrShapeBug,
  ClrShapeClock,
  ClrShapeLightbulb,
  ClrShapeTools,
  ClrShapeWorld
} from "@clr/icons/shapes/essential-shapes";

import { ClrShapeStore } from "@clr/icons/shapes/commerce-shapes";
import {
  ClrShapeAngle,
  ClrShapeAngleDouble,
  ClrShapeCog,
  ClrShapeExclamationTriangle,
  ClrShapeInfoStandard
} from "@clr/icons/shapes/core-shapes";
import { ClrShapePause } from "@clr/icons/shapes/media-shapes";
import { ClrShapeStar } from "@clr/icons/shapes/social-shapes";
import {
  ClrShapeDashboard,
  ClrShapeFlask,
  ClrShapeFloppy,
  ClrShapeInstall,
  ClrShapeUninstall
} from "@clr/icons/shapes/technology-shapes";
import { ClrShapePaintRoller } from "@clr/icons/shapes/text-edit-shapes";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public ms: MainService) {
    ClarityIcons.add({
      bug: ClrShapeBug,
      lightbulb: ClrShapeLightbulb,
      world: ClrShapeWorld,
      clock: ClrShapeClock,
      cog: ClrShapeCog,
      store: ClrShapeStore,
      "exclamation-triangle": ClrShapeExclamationTriangle,
      "angle-double": ClrShapeAngleDouble,
      angle: ClrShapeAngle,
      pause: ClrShapePause,
      infoStandard: ClrShapeInfoStandard,
      floppy: ClrShapeFloppy,
      "paint-roller": ClrShapePaintRoller,
      install: ClrShapeInstall,
      uninstall: ClrShapeUninstall,
      tools: ClrShapeTools,
      star: ClrShapeStar,
      dashboard: ClrShapeDashboard
    });
  }
}
