import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { EndInPipe } from "../end-in.pipe";
import { FormatPipe } from "../format.pipe";
import { Game } from "../model/game";
import { Research } from "../model/research";
import { Researches } from "../model/units/researches";
import { ResearchComponent } from "./research.component";

describe("ResearchComponent", () => {
  let component: ResearchComponent;
  let fixture: ComponentFixture<ResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ResearchComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchComponent);
    component = fixture.componentInstance;
    component.research = new Research(
      "",
      new Researches(
        new EventEmitter<string>(),
        new Game(
          new EventEmitter<number>(),
          new EventEmitter<string>(),
          new EventEmitter<number>(),
          null,
          null,
          null
        )
      )
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
