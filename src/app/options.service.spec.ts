import { TestBed, inject } from "@angular/core/testing";

import { OptionsService } from "./options.service";

describe("OptionsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionsService]
    });
  });

  it(
    "should be created",
    inject([OptionsService], (service: OptionsService) => {
      expect(service).toBeTruthy();
    })
  );
  describe("Save", () => {
    const options1 = new OptionsService();
    const options2 = new OptionsService();
    options1.numFormat = "engineering";
    options1.usaFormat = true;
    options1.generateFormatter();

    options2.restore(options1.getSave());

    it("equal", () => {
      expect(JSON.stringify(options1)).toBe(JSON.stringify(options1));
    });
  });
  describe("Load empty", () => {
    const options1 = new OptionsService();
    const json1 = JSON.stringify(options1);
    options1.restore({});
    it("equal", () => {
      expect(json1).toBe(JSON.stringify(options1));
    });
  });
});
