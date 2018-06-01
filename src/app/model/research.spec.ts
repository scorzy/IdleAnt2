import { Research } from "./research";
import { Researchs } from "./units/researchs";
import { FullUnit } from "./full-unit";
import { EventEmitter } from "@angular/core";

describe("Research", () => {
  const researchs = new Researchs(
    new FullUnit("sci", "science", "science"),
    new EventEmitter<string>()
  );
  researchs.declareStuff();

  it("should create an instance", () => {
    expect(
      new Research("id", "name", "description", [], researchs)
    ).toBeTruthy();
  });
  describe("Unlock", () => {
    const res = new Research("id", "name", "description", [], researchs);
    res.unlocked = false;
    res.unlock();

    it("Shoud be unlocked", () => {
      expect(res.unlocked).toBeTruthy();
    });
  });
  describe("Unlock already unlocked", () => {
    const resUnlocked = new Research(
      "idUnl",
      "name",
      "description",
      [],
      researchs
    );
    resUnlocked.unlocked = true;
    const result = resUnlocked.unlock();

    it("Shoud be unlocked", () => {
      expect(resUnlocked.unlocked).toBeTruthy();
    });
    it("Shoud return false", () => {
      expect(result).toBeFalsy();
    });
  });
  describe("Buy", () => {
    const toUnlock = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    toUnlock.unlocked = false;

    const alreadyUnlocked = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    alreadyUnlocked.unlocked = true;

    const res = new Research("id2", "name2", "description2", [], researchs);
    res.unlocked = true;
    res.toUnlock = [alreadyUnlocked, toUnlock];
    const result = res.buy();

    it("Buy", () => {
      expect(result).toBeTruthy();
    });
    it("Unlock", () => {
      expect(toUnlock.unlock).toHaveBeenCalled();
    });
    it("Already Unlocked", () => {
      expect(alreadyUnlocked.unlock).toHaveBeenCalledTimes(0);
    });
  });
  describe("Save", () => {
    const res1 = new Research("id", "name", "description", [], researchs);
    res1.unlocked = true;
    const res2 = new Research("id", "name", "description", [], researchs);
    res2.unlocked = false;

    const result = res2.restore(res1.getSave());

    it("Return true", () => {
      expect(result).toBeTruthy();
    });
    it("Restored", () => {
      expect(res2.unlocked).toBeTruthy();
    });
  });
  describe("Save different", () => {
    const resOrig = new Research("id1", "name", "description", [], researchs);
    resOrig.unlocked = true;
    const resDiff = new Research("id2", "name", "description", [], researchs);
    resOrig.unlocked = false;

    const result = resOrig.restore(resDiff.getSave());

    it("Return false", () => {
      expect(result).toBeFalsy();
    });
    it("Not modified", () => {
      expect(resOrig.unlocked).toBeFalsy();
    });
  });
});
