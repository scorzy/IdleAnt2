import { EventEmitter } from "@angular/core";
import { getGame } from "../app.component.spec";
import { Research } from "./research";
import { Researches } from "./units/researches";

describe("Research", () => {
  const game = getGame();
  const researches = new Researches(new EventEmitter<string>(), game);
  researches.declareStuff();

  it("should create an instance", () => {
    expect(new Research("id", researches)).toBeTruthy();
  });
  it("Unlock", () => {
    const res = new Research("id", researches);
    res.unlocked = false;
    res.unlock();

    expect(res.unlocked).toBeTruthy();
  });
  it("Unlock already unlocked", () => {
    const resUnlocked = new Research("idUnl", researches);
    resUnlocked.unlocked = true;
    const result = resUnlocked.unlock();

    expect(resUnlocked.unlocked).toBeTruthy();
    expect(result).toBeFalsy();
  });
  it("Buy", () => {
    const toUnlock = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    toUnlock.unlocked = false;

    const alreadyUnlocked = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    alreadyUnlocked.unlocked = true;

    const res = new Research("id2", researches);
    res.unlocked = true;
    res.toUnlock = [alreadyUnlocked, toUnlock];
    const result = res.buy();

    expect(result).toBeTruthy();
    expect(toUnlock.unlock).toHaveBeenCalled();
    expect(alreadyUnlocked.unlock).toHaveBeenCalledTimes(0);
  });
  it("Save", () => {
    const res1 = new Research("id", researches);
    res1.unlocked = true;
    const res2 = new Research("id", researches);
    res2.unlocked = false;

    const result = res2.restore(res1.getSave());

    expect(result).toBeTruthy();
    expect(res2.unlocked).toBeTruthy();
  });
  it("Save different", () => {
    const resOrig = new Research("id1", researches);
    resOrig.unlocked = true;
    const resDiff = new Research("id2", researches);
    resOrig.unlocked = false;

    const result = resOrig.restore(resDiff.getSave());

    expect(result).toBeFalsy();
    expect(resOrig.unlocked).toBeFalsy();
  });
});
