import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Game } from "./model/game";
import { World } from "./model/world";
import { OptionsService } from "./options.service";

export function getGame() {
  const ms = jasmine.createSpyObj("MainService", ["update"]);
  ms.updateEmitter = new EventEmitter<number>();
  ms.researchEmitter = new EventEmitter<string>();
  ms.worldEmitter = new EventEmitter<World>();
  ms.unlockGroupEmiter = new EventEmitter<number>();
  ms.efficiencyEmitter = new EventEmitter<number>();
  ms.endInPipe = jasmine.createSpyObj("EndInPipe", ["transform"]);
  ms.options = new OptionsService();
  return new Game(ms);
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
});
