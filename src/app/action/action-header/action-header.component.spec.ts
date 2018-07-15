import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActionHeaderComponent } from "./action-header.component";
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormatPipe } from "../../format.pipe";
import { EndInPipe } from "../../end-in.pipe";
import { Action } from "../../model/action";

describe("ActionHeaderComponent", () => {
  let component: ActionHeaderComponent;
  let fixture: ComponentFixture<ActionHeaderComponent>;

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
      declarations: [ActionHeaderComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionHeaderComponent);
    component = fixture.componentInstance;
    component.action = new Action("", "Test", "Test decription", []);
    component.quantity = new Decimal(10);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
