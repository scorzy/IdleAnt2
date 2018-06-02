import { TeamAction } from "./team-action";
import { FullUnit } from "../full-unit";

describe("TeamAction", () => {
  const teamRes = jasmine.createSpyObj("Research", ["unlocked"]);
  teamRes.unlocked = true;

  it("should create an instance", () => {
    expect(new TeamAction([], new FullUnit("id", "", ""), null)).toBeTruthy();
  });
});
