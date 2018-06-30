import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrestigeComponent } from "./prestige.component";
import { FormatPipe } from "../format.pipe";
import { ToastrModule } from "ngx-toastr";
import { ClarityModule } from "@clr/angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("PrestigeComponent", () => {
  let component: PrestigeComponent;
  let fixture: ComponentFixture<PrestigeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrestigeComponent, FormatPipe],
      imports: [ClarityModule.forRoot(), ToastrModule.forRoot()],
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
