import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UnitAutoBuyComponent } from "./unit-auto-buy.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { FormatPipe } from "../format.pipe";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { EndInPipe } from "../end-in.pipe";
import { MainService } from "../main.service";
import { SliderModule } from "primeng/slider";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("UnitAutoBuyComponent", () => {
  let component: UnitAutoBuyComponent;
  let fixture: ComponentFixture<UnitAutoBuyComponent>;

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
      declarations: [UnitAutoBuyComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAutoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
