import { ActionGroup } from "./action-group";

describe("ActionGroup", () => {
  it("should create an instance", () => {
    expect(new ActionGroup("", [])).toBeTruthy();
  });
});
