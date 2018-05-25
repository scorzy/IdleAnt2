import { async, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  // it("should create the app", async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("app");
  // }));
  // it("should render title in a h1 tag", async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector("h1").textContent).toContain(
  //     "Welcome to app!"
  //   );
  // }));
});

// @Component({
//   selector: "app-header",
//   template: ""
// })
// class MockHeaderComponent {}

// // tslint:disable-next-line:max-classes-per-file
// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: "clr-main-container",
//   template: ""
// })
// class MockClrMainContainer {}
