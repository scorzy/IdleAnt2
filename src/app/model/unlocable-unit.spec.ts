import { UnlocableUnit } from "./unlocable-unit";

describe("UnlocableUnit", () => {
    it("should create an instance", () => {
        expect(new UnlocableUnit("id", "name", "desc")).toBeTruthy();
    });
});

describe("Unlock", () => {
    const unlocable = new UnlocableUnit("id", "name", "desc");

    it("new is locked", () => {
        expect(unlocable.unlocked).toBeFalsy();
    });

    it("can unlock", () => {
        expect(unlocable.unlock()).toBeTruthy();
        expect(unlocable.unlocked).toBeTruthy();
    });

    it("cannot unlock more times", () => {
        expect(unlocable.unlock()).toBeFalsy();
        expect(unlocable.unlocked).toBeTruthy();
    });
});

describe("No load other unlocable", () => {
    const un1 = new UnlocableUnit("id", "name", "desc");
    const un2 = new UnlocableUnit("aaa", "name", "desc");

    it("No load", () => {
        expect(un1.restore(un2.getSave())).toBeFalsy();
    });
});

describe("No load unlocable", () => {
    const un1 = new UnlocableUnit("id", "name", "desc");
    const save = un1.getSave();
    un1.unlock();

    it("Save", () => {
        expect(un1.unlocked).toBeTruthy();
        expect(un1.restore(save)).toBeTruthy();
        expect(un1.unlocked).toBeFalsy();
    });
});
