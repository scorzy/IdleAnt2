import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { EndInPipe } from "../end-in.pipe";
import { FormatPipe } from "../format.pipe";
import { Action } from "../model/action";
import { AutoBuy } from "../model/autoBuy/auto-buy";
import { AutoBuyManager } from "../model/autoBuy/auto-buy-manager";
import { AutoBuyComponent } from "./auto-buy.component";

describe("AutoBuyComponent", () => {
  let component: AutoBuyComponent;
  let fixture: ComponentFixture<AutoBuyComponent>;
  const autoBuyManager = new AutoBuyManager();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule,
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
    component.autoBuy = new AutoBuy(
      new Action("", "", "", []),
      [],
      autoBuyManager
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
