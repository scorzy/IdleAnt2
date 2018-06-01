import { Research } from "./research";

describe("Research", () => {
  it("should create an instance", () => {
    expect(new Research("id", "name", "description", [])).toBeTruthy();
  });
  describe("Unlock", () => {
    const res = new Research("id", "name", "description", []);
    res.unlocked = false;
    res.unlock();

    it("Shoud be unlocked", () => {
      expect(res.unlocked).toBeTruthy();
    });
  });
  describe("Unlock already unlocked", () => {
    const resUnlocked = new Research("idUnl", "name", "description", []);
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

    const res = new Research("id2", "name2", "description2", []);
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
    const res1 = new Research("id", "name", "description", []);
    res1.unlocked = true;
    const res2 = new Research("id", "name", "description", []);
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
    const resOrig = new Research("id1", "name", "description", []);
    resOrig.unlocked = true;
    const resDiff = new Research("id2", "name", "description", []);
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
