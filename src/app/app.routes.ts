import { Routes } from "@angular/router";
import { AutoBuyTabComponent } from "./auto-buy-tab/auto-buy-tab.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { MasteryComponent } from "./mastery/mastery.component";
import { NavComponent } from "./nav/nav.component";
import { OptionsNavComponent } from "./options-nav/options-nav.component";
import { PrestigeGroupComponent } from "./prestige-group/prestige-group.component";
import { PrestigeNavComponent } from "./prestige-nav/prestige-nav.component";
import { PrestigeComponent } from "./prestige/prestige.component";
import { SaveComponent } from "./save/save.component";
import { StatsComponent } from "./stats/stats.component";
import { UiOptionsComponent } from "./ui-options/ui-options.component";
import { UnitGroupComponent } from "./unit-group/unit-group.component";
import { UnitTabsComponent } from "./unit-tabs/unit-tabs.component";
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
      { path: "unit/:id", component: UnitTabsComponent },
      { path: "group/:id", component: UnitGroupComponent }
    ]
  },
  {
    path: "pre",
    component: PrestigeNavComponent,
    children: [{ path: ":id", component: PrestigeGroupComponent }]
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
    children: [
      { path: "save", component: SaveComponent },
      { path: "ui", component: UiOptionsComponent },
      { path: "stats", component: StatsComponent }
    ]
  },
  {
    path: "mast",
    component: MasteryComponent
  },
  {
    path: "auto",
    component: AutoBuyTabComponent
  }
];
