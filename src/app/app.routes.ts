import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { UnitComponent } from "./unit/unit.component";
import { SaveComponent } from "./save/save.component";
import { OptionsNavComponent } from "./options-nav/options-nav.component";

export const APPROUTES: Routes = [
  {
    path: "",
    redirectTo: "nav/unit/fo",
    pathMatch: "full"
  },
  {
    path: "nav",
    component: NavComponent,
    children: [
      { path: "unit", component: UnitComponent },
      { path: "unit/:id", component: UnitComponent }
    ]
  },
  {
    path: "opt",
    component: OptionsNavComponent,
    children: [{ path: "save", component: SaveComponent }]
  }
];
