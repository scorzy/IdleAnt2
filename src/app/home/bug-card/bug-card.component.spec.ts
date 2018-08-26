import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { BugCardComponent } from "./bug-card.component";

describe("BugCardComponent", () => {
  let component: BugCardComponent;
  let fixture: ComponentFixture<BugCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BugCardComponent],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
