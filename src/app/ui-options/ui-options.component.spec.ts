import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UiOptionsComponent } from "./ui-options.component";
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("UiOptionsComponent", () => {
  let component: UiOptionsComponent;
  let fixture: ComponentFixture<UiOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
