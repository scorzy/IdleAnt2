import { Tabs } from "./tabs";

describe("Tabs", () => {
  it("should create an instance", () => {
    expect(new Tabs()).toBeTruthy();
  });
  it("Save 1", () => {
    const tabs = new Tabs();
    const tabs2 = new Tabs();
    tabs.lab.unlocked = true;
    const result = tabs2.restore(tabs.getSave());

    expect(result).toBeTruthy();
    expect(tabs2.lab.unlocked).toBeTruthy();
  });
  it("Save 2", () => {
    const tabs = new Tabs();
    const tabs2 = new Tabs();
    tabs.lab.unlocked = false;
    const result = tabs2.restore(tabs.getSave());

    expect(result).toBeTruthy();
    expect(tabs2.lab.unlocked).toBeFalsy();
  });
  it("Not load", () => {
    const tabs = new Tabs();
    tabs.lab.unlocked = false;
    const result = tabs.restore({});

    expect(result).toBeFalsy();
  });
});
