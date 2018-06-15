import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitGroupComponent } from "./unit-group.component";
import { UnitComponent } from "../unit/unit.component";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { NouisliderModule } from "ng2-nouislider";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";

describe("UnitGroupComponent", () => {
  let component: UnitGroupComponent;
  let fixture: ComponentFixture<UnitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitGroupComponent, UnitComponent, FormatPipe, EndInPipe],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        NouisliderModule,
        ChartsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
