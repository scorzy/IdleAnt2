import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GroupAutoBuyComponent } from "./group-auto-buy.component";

describe("GroupAutoBuyComponent", () => {
  let component: GroupAutoBuyComponent;
  let fixture: ComponentFixture<GroupAutoBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAutoBuyComponent]
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
