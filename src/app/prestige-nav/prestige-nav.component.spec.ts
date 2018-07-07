import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrestigeNavComponent } from "./prestige-nav.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";

describe("PrestigeNavComponent", () => {
  let component: PrestigeNavComponent;
  let fixture: ComponentFixture<PrestigeNavComponent>;

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
      declarations: [PrestigeNavComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestigeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
