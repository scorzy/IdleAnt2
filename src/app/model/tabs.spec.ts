import { Tabs } from "./tabs";

describe("Tabs", () => {
  it("should create an instance", () => {
    expect(new Tabs()).toBeTruthy();
  });
  describe("Save 1", () => {
    const tabs = new Tabs();
    const tabs2 = new Tabs();
    tabs.lab.unlocked = true;
    const result = tabs2.restore(tabs.getSave());

    it("Save works", () => {
      expect(result).toBeTruthy();
    });
    it("Lab unlocked", () => {
      expect(tabs2.lab.unlocked).toBeTruthy();
    });
  });
  describe("Save 2", () => {
    const tabs = new Tabs();
    const tabs2 = new Tabs();
    tabs.lab.unlocked = false;
    const result = tabs2.restore(tabs.getSave());

    it("Save works", () => {
      expect(result).toBeTruthy();
    });
    it("Lab locked", () => {
      expect(tabs2.lab.unlocked).toBeFalsy();
    });
  });
  describe("Not load", () => {
    const tabs = new Tabs();
    tabs.lab.unlocked = false;
    const result = tabs.restore({});

    it("No load empty", () => {
      expect(result).toBeFalsy();
    });
  });
});
