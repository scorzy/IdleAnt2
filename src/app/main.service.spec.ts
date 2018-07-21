import { inject, TestBed } from "@angular/core/testing";

import { ToastrModule, ToastrService } from "ngx-toastr";
import { MainService } from "./main.service";

describe("MainService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ToastrService, MainService]
    });
  });

  it(
    "should be created",
    inject([MainService], (service: MainService) => {
      expect(service).toBeTruthy();
    })
  );
});
