import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ClarityModule } from "@clr/angular";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { EndInPipe } from "../../end-in.pipe";
import { FormatPipe } from "../../format.pipe";
import { MainService } from "../../main.service";
import { OptionsService } from "../../options.service";
import { GroupAutoBuyComponent } from "./group-auto-buy.component";

describe("GroupAutoBuyComponent", () => {
  let component: GroupAutoBuyComponent;
  let fixture: ComponentFixture<GroupAutoBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAutoBuyComponent, FormatPipe, EndInPipe],
      imports: [
        ClarityModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastrService, OptionsService, MainService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAutoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
