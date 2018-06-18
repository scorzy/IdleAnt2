import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActionGroupComponent } from "./action-group.component";
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { ActionGroup } from "../model/actions/action-group";
import { Game } from "../model/game";

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
      new Game(new EventEmitter<number>(), new EventEmitter<string>())
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
