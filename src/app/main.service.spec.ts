import { TestBed, inject } from "@angular/core/testing";

import { MainService } from "./main.service";
import { ToastrService, ToastrModule } from "ngx-toastr";

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
