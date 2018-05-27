import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PriceLineComponent } from "./price-line.component";
import { FormatPipe } from "../../format.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("PriceLineComponent", () => {
  let component: PriceLineComponent;
  let fixture: ComponentFixture<PriceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [PriceLineComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
