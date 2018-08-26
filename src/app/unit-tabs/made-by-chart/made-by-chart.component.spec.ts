import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SliderModule } from "primeng/components/slider/slider";
import { MainService } from "../../main.service";
import { MadeByChartComponent } from "./made-by-chart.component";

describe("MadeByChartComponent", () => {
  let component: MadeByChartComponent;
  let fixture: ComponentFixture<MadeByChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MadeByChartComponent],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        SliderModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastrService, MainService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadeByChartComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
