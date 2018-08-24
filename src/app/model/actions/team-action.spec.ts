import { TeamAction } from "./team-action";

describe("TeamAction", () => {
  const teamRes = jasmine.createSpyObj("Research", ["unlocked"]);
  teamRes.unlocked = true;

  it("should create an instance", () => {
    expect(new TeamAction([])).toBeTruthy();
  });

  describe("Team not researched", () => {
    it("should create an instance", () => {
      teamRes.done = false;
      const team = new TeamAction([]);
      team.teamRes = teamRes;
      team.reload();
      expect(team.canBuy).toBeFalsy();
    });
  });
  describe("Team researched", () => {
    it("should create an instance", () => {
      teamRes.done = true;
      const team = new TeamAction([]);
      team.teamRes = teamRes;
      team.reload();
      expect(team.canBuy).toBeTruthy();
    });
  });
});
