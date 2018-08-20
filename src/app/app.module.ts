import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ClarityModule, ClrFormsNextModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SliderModule } from "primeng/slider";
import { ActionGroupComponent } from "./action-group/action-group.component";
import { ActionHeaderComponent } from "./action/action-header/action-header.component";
import { ActionComponent } from "./action/action.component";
import { ButtonsComponent } from "./action/buttons/buttons.component";
import { CantBuySignpostsComponent } from "./action/cant-buy-signposts/cant-buy-signposts.component";
import { PriceLineComponent } from "./action/price-line/price-line.component";
import { AppComponent } from "./app.component";
import { APPROUTES } from "./app.routes";
import { AutoBuyComponent } from "./auto-buy/auto-buy.component";
import { ChangeWorldComponent } from "./change-world/change-world.component";
import { EndInPipe } from "./end-in.pipe";
import { FormatPipe } from "./format.pipe";
import { HeaderComponent } from "./header/header.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { MainService } from "./main.service";
import { MasteryComponent } from "./mastery/mastery.component";
import { MaterialNavComponent } from "./material-nav/material-nav.component";
import { TabComponent } from "./material-nav/tab/tab.component";
import { NavComponent } from "./nav/nav.component";
import { UnitLineComponent } from "./nav/unit-line/unit-line.component";
import { OptionsNavComponent } from "./options-nav/options-nav.component";
import { OptionsService } from "./options.service";
import { PolynomComponent } from "./polynom/polynom.component";
import { PrestigeBuyComponent } from "./prestige-buy/prestige-buy.component";
import { PrestigeGroupComponent } from "./prestige-group/prestige-group.component";
import { PrestigeNavComponent } from "./prestige-nav/prestige-nav.component";
import { PrestigeComponent } from "./prestige/prestige.component";
import { ProductionSignpostsComponent } from "./production-signposts/production-signposts.component";
import { ResearchComponent } from "./research/research.component";
import { SaveComponent } from "./save/save.component";
import { StatsComponent } from "./stats/stats.component";
import { UiOptionsComponent } from "./ui-options/ui-options.component";
import { UnitAutoBuyComponent } from "./unit-auto-buy/unit-auto-buy.component";
import { UnitGroupComponent } from "./unit-group/unit-group.component";
import { UnitTabsComponent } from "./unit-tabs/unit-tabs.component";
import { UnitComponent } from "./unit/unit.component";
import { WorldComponent } from "./world/world.component";
import { NameComponent } from './research/name/name.component';
import { RomanPipe } from './roman.pipe';
import { AutoBuyTabComponent } from './auto-buy-tab/auto-buy-tab.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    UnitComponent,
    FormatPipe,
    ActionComponent,
    UnitLineComponent,
    PriceLineComponent,
    PolynomComponent,
    OptionsNavComponent,
    SaveComponent,
    LaboratoryComponent,
    EndInPipe,
    ResearchComponent,
    MaterialNavComponent,
    ProductionSignpostsComponent,
    CantBuySignpostsComponent,
    UnitGroupComponent,
    ActionGroupComponent,
    TabComponent,
    WorldComponent,
    ChangeWorldComponent,
    PrestigeComponent,
    UiOptionsComponent,
    PrestigeNavComponent,
    PrestigeGroupComponent,
    PrestigeBuyComponent,
    AutoBuyComponent,
    UnitAutoBuyComponent,
    UnitTabsComponent,
    ButtonsComponent,
    ActionHeaderComponent,
    StatsComponent,
    MasteryComponent,
    NameComponent,
    RomanPipe,
    AutoBuyTabComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(APPROUTES, { useHash: true }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: false
    }),
    FormsModule,
    SliderModule,
    ClrFormsNextModule
  ],
  providers: [ToastrService, OptionsService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule {}
