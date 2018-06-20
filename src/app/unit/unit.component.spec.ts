import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UnitComponent } from "./unit.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { FormsModule } from "@angular/forms";
import { FormatPipe } from "../format.pipe";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { EndInPipe } from "../end-in.pipe";
import { MainService } from "../main.service";
import { SliderModule } from "primeng/slider";

describe("UnitComponent", () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitComponent, FormatPipe, EndInPipe],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        SliderModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastrService, MainService]
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
