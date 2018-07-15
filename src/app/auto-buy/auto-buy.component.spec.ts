import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AutoBuyComponent } from "./auto-buy.component";

describe("AutoBuyComponent", () => {
  let component: AutoBuyComponent;
  let fixture: ComponentFixture<AutoBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoBuyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
