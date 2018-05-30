import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitComponent } from "./unit.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { FormsModule } from "@angular/forms";
import { NouisliderModule } from "ng2-nouislider";
import { FormatPipe } from "../format.pipe";

describe("UnitComponent", () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitComponent, FormatPipe],
      imports: [
        ClarityModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        NouisliderModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
