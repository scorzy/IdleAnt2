import {
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SliderModule } from "primeng/slider";
import { EndInPipe } from "../end-in.pipe";
import { FormatPipe } from "../format.pipe";
import { MainService } from "../main.service";
import { UnitComponent } from "./unit.component";

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
  it("unit", () => {
    spyOn(component, "getUnit").and.callThrough();
    component.unit = component.ms.game.gatherers.drone;
    component.ngOnChanges();
    expect(component.getUnit).toHaveBeenCalled();
  });
  it("malus", () => {
    spyOn(component, "getUnit").and.callThrough();
    component.unit = component.ms.game.worldMalus.scienceMalus1;
    component.ngOnChanges();
    expect(component.getUnit).toHaveBeenCalled();
    expect(component.malus.id).toBeDefined();
  });
});
