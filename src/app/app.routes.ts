import { Routes } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { UnitComponent } from "./unit/unit.component";
import { SaveComponent } from "./save/save.component";
import { OptionsNavComponent } from "./options-nav/options-nav.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { UnitGroupComponent } from "./unit-group/unit-group.component";
import { PrestigeComponent } from "./prestige/prestige.component";

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
      { path: "unit/:id", component: UnitComponent },
      { path: "group/:id", component: UnitGroupComponent }
    ]
  },
  {
    path: "lab",
    component: LaboratoryComponent
  },
  {
    path: "travel",
    component: PrestigeComponent
  },
  {
    path: "opt",
    component: OptionsNavComponent,
    children: [{ path: "save", component: SaveComponent }]
  }
];
