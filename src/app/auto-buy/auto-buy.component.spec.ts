import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AutoBuyComponent } from "./auto-buy.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { AutoBuy } from "../model/autoBuy/auto-buy";
import { Action } from "../model/action";

describe("AutoBuyComponent", () => {
  let component: AutoBuyComponent;
  let fixture: ComponentFixture<AutoBuyComponent>;

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
      declarations: [AutoBuyComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoBuyComponent);
    component = fixture.componentInstance;
    component.autoBuy = new AutoBuy(new Action("", "", "", []), []);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
