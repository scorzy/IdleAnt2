import positions from "./positions.json";

export enum MasteryTypes {
  MORE_FOLLOWERS = 0,
  MORE_IDLE_8H,
  FOOD_BONUS,
  SCIENCE_BONUS,
  CRYSTAL_BONUS,
  SOIL_BONUS,
  HARVEST_BONUS,
  MATERIAL_GAIN,
  MORE_FOLLOWERS_GA,
  MORE_FOLLOWERS_WO,
  TIME_GEN,
  TIME_BANK,
  TEAM_START,
  TEAM_PRESTIGE,
  SCIENTIFIC_METHOD,
  TECHNOLOGY_PRESTIGE,
  START_TWIN,
  FREE_WARP_RES,
  TIME_GEN_AND_BANK,
  START_RESEARCHS,
  DOUBLE_PREFIX,
  DOUBLE_SUFFIX,
  WORLD_LEVEL,
  WORLD_LEVEL_PRESTIGE,
  BETTER_WORLD,
  BETTER_WORLD_EXPERIENCE,
  BETTER_HELPERS,
  DOUBLE_ARMY
}
export const notable = [
  MasteryTypes.MATERIAL_GAIN,
  MasteryTypes.START_TWIN,
  MasteryTypes.FREE_WARP_RES,
  MasteryTypes.TIME_GEN_AND_BANK,
  MasteryTypes.START_RESEARCHS,
  MasteryTypes.DOUBLE_PREFIX,
  MasteryTypes.DOUBLE_SUFFIX,
  MasteryTypes.WORLD_LEVEL,
  MasteryTypes.DOUBLE_ARMY
];

export class Mastery {
  static readonly normalColor = "#4286f4dd";
  static readonly availableColor = "#008000dd";
  static readonly ownedColor = "#ff0000dd";
  static readonly notableColor = "#ffa500dd";

  static getDescription(type: MasteryTypes, num = 1): string {
    let ret = "";
    switch (type) {
      case MasteryTypes.MORE_FOLLOWERS: {
        ret = "+" + 100 * num + "%\nmore followers";
        break;
      }
      case MasteryTypes.MORE_IDLE_8H: {
        ret = "+" + 30 * num + "% idle time\nafter 8h";
        break;
      }
      case MasteryTypes.SCIENCE_BONUS: {
        ret = "+" + 10 * num + "%\nscience";
        break;
      }
      case MasteryTypes.FOOD_BONUS: {
        ret = "+" + 10 * num + "%\nfood";
        break;
      }
      case MasteryTypes.SOIL_BONUS: {
        ret = "+" + 10 * num + "%\nsoil";
        break;
      }
      case MasteryTypes.CRYSTAL_BONUS: {
        ret = "+" + 10 * num + "%\ncrystal";
        break;
      }
      case MasteryTypes.HARVEST_BONUS: {
        ret = "+" + 20 * num + "% resource\nfrom Gatherers";
        break;
      }
      case MasteryTypes.MATERIAL_GAIN: {
        ret = "+" + 10 * num + "%\nmaterials gain";
        break;
      }
      case MasteryTypes.MORE_FOLLOWERS_GA: {
        ret = "+" + 300 * num + "% more\nGatherers followers";
        break;
      }
      case MasteryTypes.MORE_FOLLOWERS_WO: {
        ret = "+" + 300 * num + "% more\nWorker followers";
        break;
      }
      case MasteryTypes.TIME_GEN: {
        ret = "+" + 30 * num + "%\ntime /s";
        break;
      }
      case MasteryTypes.TIME_BANK: {
        ret = "+" + 50 * num + "%\n time bank";
        break;
      }
      case MasteryTypes.TIME_GEN_AND_BANK: {
        ret = "+" + 200 * num + "%\n time /s and time bank";
        break;
      }
      case MasteryTypes.TEAM_START: {
        ret = "start new world with\n" + 1 * num + " team upgrade";
        break;
      }
      case MasteryTypes.TEAM_PRESTIGE: {
        ret = "prestige team up are \n" + 100 * num + "% more effective";
        break;
      }
      case MasteryTypes.SCIENTIFIC_METHOD: {
        ret = "scientific method research\n" + 100 * num + "% more effective";
        break;
      }
      case MasteryTypes.TECHNOLOGY_PRESTIGE: {
        ret = "technology experience up\n" + 100 * num + "% more effective";
        break;
      }
      case MasteryTypes.START_TWIN: {
        ret = "start new world with\n" + 1 * num + " twin upgrade";
        break;
      }
      case MasteryTypes.FREE_WARP_RES: {
        ret = "start new world \nfree warps (1h 2h 3h)";
        break;
      }
      case MasteryTypes.START_RESEARCHS: {
        ret = "start new world\n4 scientific method and harvesting";
        break;
      }
      case MasteryTypes.DOUBLE_PREFIX: {
        ret = "30% chance of\ndouble Prefix";
        break;
      }
      case MasteryTypes.DOUBLE_SUFFIX: {
        ret = "30% chance of\ndouble Suffix";
        break;
      }
      case MasteryTypes.WORLD_LEVEL: {
        ret = "reduce world travel requirements";
        break;
      }
      case MasteryTypes.BETTER_WORLD: {
        ret = "+" + 20 * num + "%\nWorld Bonus";
        break;
      }
      case MasteryTypes.BETTER_WORLD_EXPERIENCE: {
        ret = "Better World Prestige up are\n50% more effective";
        break;
      }
      case MasteryTypes.WORLD_LEVEL_PRESTIGE: {
        ret = "Max Level Prestige are\n50% more effective";
        break;
      }
      case MasteryTypes.BETTER_HELPERS: {
        ret = "+100% Bonus\nfrom Helpers";
        break;
      }
      case MasteryTypes.DOUBLE_ARMY: {
        ret = "+200%\nArmy killing";
        break;
      }
    }
    return ret;
  }

  label = "";
  color = "blue";
  available = false;
  owned = false;

  constructor(
    public id: number,
    public type: MasteryTypes,
    public x = 0,
    public y = 0
  ) {
    this.label = Mastery.getDescription(type);
    this.color = notable.find(n => n === this.type)
      ? Mastery.notableColor
      : Mastery.normalColor;

    if (this.id in positions) {
      this.x = positions[this.id].x;
      this.y = positions[this.id].y;
    }
  }
}
