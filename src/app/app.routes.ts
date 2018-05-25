import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { UnitComponent } from "./unit/unit.component";

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
  }
];
