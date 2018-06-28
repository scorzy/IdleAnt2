import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeWorldComponent } from "./change-world.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { FormatPipe } from "../format.pipe";
import { ToastrModule } from "ngx-toastr";

describe("ChangeWorldComponent", () => {
  let component: ChangeWorldComponent;
  let fixture: ComponentFixture<ChangeWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ClarityModule.forRoot(), ToastrModule.forRoot()],
      declarations: [ChangeWorldComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
