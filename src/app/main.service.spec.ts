import { inject, TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MainService } from "./main.service";

describe("MainService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [ToastrService, MainService]
    });
  });

  it(
    "should be created",
    inject([MainService], (service: MainService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    "load error",
    inject([MainService], (service: MainService) => {
      localStorage.clear();
      const ret = service.load();
      expect(ret).toBeFalsy();
    })
  );

  it(
    "save and load",
    inject([MainService], (service: MainService) => {
      service.save();
      const ret = service.load();
      expect(ret).toBeTruthy();
    })
  );
});
