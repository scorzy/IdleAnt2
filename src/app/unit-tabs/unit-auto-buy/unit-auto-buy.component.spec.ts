import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SliderModule } from "primeng/slider";
import { EndInPipe } from "../../end-in.pipe";
import { FormatPipe } from "../../format.pipe";
import { MainService } from "../../main.service";
import { UnitAutoBuyComponent } from "./unit-auto-buy.component";

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
