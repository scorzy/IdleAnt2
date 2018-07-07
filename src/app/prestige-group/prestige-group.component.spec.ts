import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrestigeGroupComponent } from "./prestige-group.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("PrestigeGroupComponent", () => {
  let component: PrestigeGroupComponent;
  let fixture: ComponentFixture<PrestigeGroupComponent>;

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
      declarations: [PrestigeGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestigeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
