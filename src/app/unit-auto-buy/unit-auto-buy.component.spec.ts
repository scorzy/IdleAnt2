import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitAutoBuyComponent } from "./unit-auto-buy.component";

describe("UnitAutoBuyComponent", () => {
  let component: UnitAutoBuyComponent;
  let fixture: ComponentFixture<UnitAutoBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitAutoBuyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAutoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
