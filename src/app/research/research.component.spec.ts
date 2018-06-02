import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResearchComponent } from "./research.component";
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { Research } from "../model/research";
import { Researchs } from "../model/units/researchs";
import { FullUnit } from "../model/full-unit";

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
      "name",
      "desc",
      [],
      new Researchs(new FullUnit("", "", ""), new EventEmitter<string>())
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
