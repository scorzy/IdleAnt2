import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of } from "rxjs/internal/observable/of";
import { EndInPipe } from "../../end-in.pipe";
import { FormatPipe } from "../../format.pipe";
import { MainService } from "../../main.service";
import { OptionsService } from "../../options.service";
import { UnitGroupComponent } from "./unit-group.component";

describe("UnitGroupComponent", () => {
  let component: UnitGroupComponent;
  let fixture: ComponentFixture<UnitGroupComponent>;
  let ms: MainService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitGroupComponent, FormatPipe, EndInPipe],
      imports: [
        ClarityModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule
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
    ms = TestBed.get(MainService);
    fixture = TestBed.createComponent(UnitGroupComponent);
    component = fixture.componentInstance;
    component.unitGroup = ms.game.unitGroups[0];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
