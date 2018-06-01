import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ClarityModule } from "@clr/angular";
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
import { NouisliderModule } from "ng2-nouislider";
import { FormsModule } from "@angular/forms";
import { OptionsNavComponent } from "./options-nav/options-nav.component";
import { SaveComponent } from "./save/save.component";
import { LaboratoryComponent } from "./laboratory/laboratory.component";
import { EndInPipe } from './end-in.pipe';

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
    EndInPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(APPROUTES, { useHash: true }),
    ToastrModule.forRoot(),
    FormsModule,
    NouisliderModule
  ],
  providers: [ToastrService, OptionsService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule {}
