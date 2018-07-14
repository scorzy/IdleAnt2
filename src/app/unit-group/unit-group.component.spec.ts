import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitGroupComponent } from "./unit-group.component";
import { UnitComponent } from "../unit/unit.component";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import { Game } from "../model/game";
import { ActivatedRoute } from "@angular/router";
import { MainService } from "../main.service";
import { of } from "rxjs/internal/observable/of";
import { OptionsService } from "../options.service";
import {
  UnitQuantitySorter,
  UnitBoughtSorter,
  UnitTeamSorter,
  UnitTwinSorter
} from "../model/utility";

describe("UnitGroupComponent", () => {
  let component: UnitGroupComponent;
  let fixture: ComponentFixture<UnitGroupComponent>;
  const game = new Game(new EventEmitter<number>(), new EventEmitter<string>());

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
