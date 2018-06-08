import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductionSignpostsComponent } from "./production-signposts.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { Production } from "../model/production";
import { FullUnit } from "../model/full-unit";
import { FormatPipe } from "../format.pipe";

describe("ProductionSignpostsComponent", () => {
  let component: ProductionSignpostsComponent;
  let fixture: ComponentFixture<ProductionSignpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [ProductionSignpostsComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionSignpostsComponent);
    component = fixture.componentInstance;
    component.production = new Production(new FullUnit(""), new FullUnit(""));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
