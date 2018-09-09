import { Tab } from "./tab";

describe("Tab", () => {
  it("should create an instance", () => {
    expect(new Tab("id")).toBeTruthy();
  });
  it("Unlock", () => {
    const tab = new Tab("id");

    tab.unlocked = false;

    tab.unlock();

    expect(tab.unlocked).toBeTruthy();
  });
  it("Save", () => {
    const tab1 = new Tab("id");
    const tab2 = new Tab("id");

    tab1.unlocked = false;

    tab1.restore(tab2.getSave());

    expect(JSON.stringify(tab1)).toEqual(JSON.stringify(tab2));
  });
  it("Not load with different id", () => {
    const tab1 = new Tab("old");
    const tab2 = new Tab("new");

    expect(tab1.restore(tab2.getSave())).toBeFalsy();
  });
});
