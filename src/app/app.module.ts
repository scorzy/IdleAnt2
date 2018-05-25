import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ClarityModule } from "@clr/angular";
import { HeaderComponent } from "./header/header.component";
import { APPROUTES } from "./app.routes";
import { NavComponent } from "./nav/nav.component";
import { UnitComponent } from "./unit/unit.component";
import { GameService } from "./model/game.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavComponent, UnitComponent],
  imports: [
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(APPROUTES, { useHash: true })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
