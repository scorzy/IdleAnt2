import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { EndInPipe } from "../end-in.pipe";
import { FormatPipe } from "../format.pipe";
import { ActionGroup } from "../model/actions/action-group";
import { Game } from "../model/game";
import { ActionGroupComponent } from "./action-group.component";

describe("ActionGroupComponent", () => {
  let component: ActionGroupComponent;
  let fixture: ComponentFixture<ActionGroupComponent>;

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
      declarations: [ActionGroupComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionGroupComponent);
    component = fixture.componentInstance;
    component.actGr = new ActionGroup(
      "",
      [],
      new Game(
        new EventEmitter<number>(),
        new EventEmitter<string>(),
        new EventEmitter<number>()
      )
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
