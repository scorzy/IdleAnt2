import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { FormatPipe } from "../format.pipe";
import { PrestigeComponent } from "./prestige.component";

describe("PrestigeComponent", () => {
  let component: PrestigeComponent;
  let fixture: ComponentFixture<PrestigeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrestigeComponent, FormatPipe],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
