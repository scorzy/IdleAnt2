import { TeamAction } from "./team-action";

describe("TeamAction", () => {
  const teamRes = jasmine.createSpyObj("Research", ["unlocked"]);
  teamRes.unlocked = true;

  it("should create an instance", () => {
    expect(new TeamAction([])).toBeTruthy();
  });

  it("Team not researched", () => {
    teamRes.done = false;
    const team = new TeamAction([]);
    team.teamRes = teamRes;
    team.reload();
    expect(team.canBuy).toBeFalsy();
  });
  it("Team researched", () => {
    teamRes.done = true;
    const team = new TeamAction([]);
    team.teamRes = teamRes;
    team.reload();
    expect(team.canBuy).toBeTruthy();
  });
});
