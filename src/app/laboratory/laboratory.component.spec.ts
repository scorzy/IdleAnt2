import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LaboratoryComponent } from "./laboratory.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";
import { FormsModule } from "@angular/forms";

describe("LaboratoryComponent", () => {
  let component: LaboratoryComponent;
  let fixture: ComponentFixture<LaboratoryComponent>;

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
      declarations: [LaboratoryComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
