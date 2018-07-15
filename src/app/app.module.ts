import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ClarityModule, ClrFormsNextModule } from "@clr/angular";
import { HeaderComponent } from "./header/header.component";
import { APPROUTES } from "./app.routes";
import { NavComponent } from "./nav/nav.component";
import { UnitComponent } from "./unit/unit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "./format.pipe";
import { OptionsService } from "./options.service";
import { MainService } from "./main.service";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ActionComponent } from "./action/action.component";
import { UnitLineComponent } from "./nav/unit-line/unit-line.component";
import { PriceLineComponent } from "./action/price-line/price-line.component";
import { PolynomComponent } from "./polynom/polynom.component";
import { FormsModule } from "@angular/forms";
import { OptionsNavComponent } from "./options-nav/options-nav.component";
import { SaveComponent } from "./save/save.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { EndInPipe } from "./end-in.pipe";
import { ResearchComponent } from "./research/research.component";
import { MaterialNavComponent } from "./material-nav/material-nav.component";
import { ProductionSignpostsComponent } from "./production-signposts/production-signposts.component";
import { CantBuySignpostsComponent } from "./action/cant-buy-signposts/cant-buy-signposts.component";
import { UnitGroupComponent } from "./unit-group/unit-group.component";
import { ActionGroupComponent } from "./action-group/action-group.component";
import { SliderModule } from "primeng/slider";
import { TabComponent } from "./material-nav/tab/tab.component";
import { WorldComponent } from "./world/world.component";
import { ChangeWorldComponent } from "./change-world/change-world.component";
import { PrestigeComponent } from "./prestige/prestige.component";
import { UiOptionsComponent } from "./ui-options/ui-options.component";
import { PrestigeNavComponent } from "./prestige-nav/prestige-nav.component";
import { PrestigeGroupComponent } from "./prestige-group/prestige-group.component";
import { PrestigeBuyComponent } from "./prestige-buy/prestige-buy.component";
import { AutoBuyComponent } from "./auto-buy/auto-buy.component";
import { UnitAutoBuyComponent } from "./unit-auto-buy/unit-auto-buy.component";
import { UnitTabsComponent } from "./unit-tabs/unit-tabs.component";
import { ButtonsComponent } from "./action/buttons/buttons.component";
import { ActionHeaderComponent } from "./action/action-header/action-header.component";

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
    ActionHeaderComponent
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
