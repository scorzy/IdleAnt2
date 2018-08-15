import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of } from "rxjs/internal/observable/of";
import { EndInPipe } from "../end-in.pipe";
import { FormatPipe } from "../format.pipe";
import { MainService } from "../main.service";
import { Game } from "../model/game";
import {
  UnitBoughtSorter,
  UnitQuantitySorter,
  UnitTeamSorter,
  UnitTwinSorter
} from "../model/utility";
import { OptionsService } from "../options.service";
import { UnitComponent } from "../unit/unit.component";
import { UnitGroupComponent } from "./unit-group.component";

describe("UnitGroupComponent", () => {
  let component: UnitGroupComponent;
  let fixture: ComponentFixture<UnitGroupComponent>;
  const game = new Game(
    new EventEmitter<number>(),
    new EventEmitter<string>(),
    new EventEmitter<number>()
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitGroupComponent, UnitComponent, FormatPipe, EndInPipe],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ToastrService,
        OptionsService,
        MainService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) }
        },
        { provide: ChangeDetectorRef, useValue: {} }
      ]
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
