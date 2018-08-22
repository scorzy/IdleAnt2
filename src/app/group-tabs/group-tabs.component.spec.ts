/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { GroupTabsComponent } from "./group-tabs.component";

describe("GroupTabsComponent", () => {
  let component: GroupTabsComponent;
  let fixture: ComponentFixture<GroupTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTabsComponent],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
