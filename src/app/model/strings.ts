export const STRINGS = {
  units: {
    prest: ["Experience", ""],
    time: ["Time", ""],
    //  Materials
    f: ["Food", "Food is used to sustain all units."],
    w: ["Soil", "Soil is used to build better a nest."],
    c: ["Crystal", "Crystal is used for scientific research."],
    s: ["Science", "Science is used to discover new things."],
    //  Ants
    l: ["Larva", "Larva"],
    q: ["Queen", "Queen"],
    n: ["Nest", "Nest"],
    //  Gathering
    e: ["Drone", "Drones gather food."],
    h: ["Geologist", "Geologists will search for crystals."],
    i: [
      "Student",
      [
        "Students will try to research science.",
        "Students need to drink crystal."
      ]
    ],
    //  Workers
    a: [
      "Farmer",
      [
        "Hydroponics farmers use crystals to grow fungi without soil.",
        "Ants are the World’s Best Fungus Farmers.",
        "Farming since 10.000 BC."
      ]
    ],
    b: ["Carpenter", "Carpenter ants build nests in soil."],
    m: [
      "Miner",
      [
        "Miners extract crystals through mining.",
        "Unsurprisingly, yet another idle game with miners."
      ]
    ],
    d: [
      "Scientist",
      [
        "Scientists gather science.",
        "Scientists need to drink crystal.",
        "Scientists are like students, but better."
      ]
    ],
    // Buildings
    aG: ["Farm", "A hydroponics farm."],
    bG: ["Soil Camp", "A soil camp is used to get more soil."],
    mG: ["Mine", "A crystal mine."],
    dG: ["University", "A university trains Scientists."],
    //  Engineers
    aGG: ["Hydro Eng.", "Hydro Engineers make Farms."],
    bGG: ["Soil Eng.", "Soil Engineers make Soil Camps."],
    mGG: ["Mine Eng.", "Mine Engineers make Mines."],
    dGG: ["Education Dep.", "The Department of Education makes Universities."],
    //  World Bonus
    1: ["Food Production Bonus", ""],
    2: ["Soil Production Bonus", ""],
    3: ["Crystal Production Bonus", ""],
    4: ["Science Production Bonus", ""],
    5: ["Kill Bonus", ""],
    larvaBon: ["Larvae Production Bonus", ""],
    queenBon: ["Queen Production Bonus", ""],
    //  Malus
    Mf1: ["Poisonous Fungus", "Poisonous Fungus"],
    Mf2: ["Ancient Fungus", "Ancient Fungus"],
    Mf3: ["Zombie Fungus", "Zombie Fungus"],
    Mw1: ["Carnivorous plant", ""],
    Mw2: ["Flypaper traps", ""],
    Mw3: ["Pitcher plant", ""],
    Mc1: ["Small Mites", ""],
    Mc2: ["Mites", ""],
    Mc3: ["Parasitic Mites", ""],
    Ms1: ["Zombie Fungus Spore", ""],
    Ms2: ["Zombie Fungus", ""],
    Ms3: ["Colony of Zombie Fungus ", ""],
    //  Killers
    F: ["Disinfestation Ant", "Destroy poisonous fungus."],
    W: ["Fire Ant", ["Burn Carnivorous plant", "Fire ants actually exist."]],
    C: ["Black garden ant", "Kill Mites."],
    S: ["Yellow crazy Ant", "Kill Zombie Fungus."],
    HB: ["General", "+10% killing."],
    HQ: ["Headquarter", "+10% killing."],
    //  Mastery Bonus
    scieMast: ["Science Mastery"],
    fooMast: ["Food Mastery"],
    wooMast: ["Soil Mastery"],
    cryMast: ["Crystal Mastery"],
    harvMast: ["Harvest Mastery"],
    matMast: ["Material Mastery"],
    armyMast: ["Army Mastery"],
    //  Supply
    fS: ["Food Supply", "Never ending food supply"],
    wS: ["Soil Supply", "Never ending soil supply"],
    cS: ["Crystal Supply", "Never ending crystal supply"],
    //  Bee
    Z: ["Foraging Bee", "Foraging Bee"],
    cb: ["Carpenter Bee", "Foraging Bee"],
    sb: ["Student Bee", "Foraging Bee"],
    Q: ["Bee Larva", "Bee Larva"],
    P: ["Bee Queen", "Bee Queen"],
    N: ["Bee Hive", "Bee Hive"],
    A: ["Bee Farmer", "Farms flowers."],
    B: ["Bee Carpenter", "Carpenter Bee."],
    E: ["Bee Miner", "Miner Bee."],
    D: ["Bee Scientist", "Scientist Bee."],
    AG: ["Flowers Farm", "Farm of flowers."],
    BG: ["Bee Soil Camp", "Bee Soil Camp"],
    EG: ["Bee Mine", "Bee Mine"],
    DG: ["Bee University", "Bee University"],
    AGG: ["Florists Eng. ", "Florists Engineers make Flowers Farms."],
    BGG: ["Bee Soil Eng.", "Bee Soil Engineers make Bee Soil Camps."],
    EGG: ["Bee Mine Eng.", "Bee Mine Engineers make Bee Mines."],
    DGG: ["Bee's Dep. of Education", "Bee's Department of Education"],
    //  Wasp
    x: ["Foraging Wasp", "Foraging Wasp"],
    hw: ["Hornet", ["Hornet", "A wasp on steroids."]],
    sw: ["Smart Wasp", "Smart Wasp"],
    y: ["Wasp Larva", "Wasp Larva"],
    z: ["Wasp Queen", "Wasp Queen"],
    r: ["Wasp Hive", "Wasp Hive"],
    v: ["Wasp Farmer", "A Farming wasp."],
    V: ["Wasp Carpenter", "A Carpenter Wasp."],
    o: ["Wasp Miner", "A Miner Wasp."],
    p: ["Wasp Scientist", "A Scientist Wasp."],
    vG: ["Wasp Farm", "Waspy Farm."],
    VG: ["Wasp Soil Camp", "Waspy Soil Camp."],
    oG: ["Wasp Mine", "Waspy Mine."],
    pG: ["Wasp University", "Waspy University"],
    vGG: ["Wasp Hydro Eng.", "Wasp Hydro Engineer makes Wasp Farms."],
    VGG: ["Wasp Soil Eng.", "Wasp Soil Engineer makes Wasp Soil Camp Farms."],
    oGG: ["Wasp Mine Eng.", "Wasp Mine Engineer makes Wasp Mines."],
    pGG: [
      "Wasp's Dep. of Education",
      "Wasp's Department of Education makes Wasp Universities."
    ],
    //  Helpers
    lf: ["Leaf Cutter", "Improve Farming."],
    hu: ["Hunter", ""],
    mw: ["Major Worker", ""],
    mh: ["Big Miner", "Improve Mining."],
    sh: ["Big Carpenter", "Improve soil gathering."]
  },
  researches: {
    t: ["Team Work", "Get production bonus based on manually bought."],
    T: ["Team Work 2", "Make team bonus upgradable."], // upgradable ?
    W: ["Twin", "Multiple units for same price."],
    r: ["Travel", "Travel to a new world!"],
    M: ["Mastery", "Get one mastery point."],
    h: ["Harvesting", "+100% resource from Gatherers."],
    1: ["1H Warp", "Free time warp."],
    2: ["2H Warp", "Free time warp."],
    3: ["3H Warp", "Free time warp."],
    SP: ["Spawn", "+50% larvae production."],
    ont: [
      "Extreme",
      "+10% world level and prestige; +20% requirements; add random malus and increase malus; if current world level is higher than 15 and higher than 50% Max Level, grant one mastery point on travel"
    ],
    //  Workers
    wo: ["Better Workers", "+30% production from workers."],
    we: ["Efficient Workers", "+10% resource gain."],
    w: ["Workers", "Workers"],
    a: [
      "Farmer",
      "Hydroponics farmers use crystals to grow fungi without soil."
    ],
    b: ["Carpenter", "Carpenter ants build nests consisting of galleries."],
    m: ["Miner", "miner"],
    d: ["Scientist", "scientist"],
    scie1: ["Scientific Method", "+50% science production"],
    // Buildings
    u: ["Buildings", "Buildings make workers."],
    aG: ["Farm", "Hydroponics farm of Fungus."],
    bG: ["Soil Camp", "A fertile soil source."],
    mG: ["Mine", "A crystal mine."],
    dG: ["University", "A university trains scientists."],
    //  Engineers
    e: ["Engineers", "Engineers make Buildings."],
    aGG: ["Hydro Eng.", "Hydro Engineers make Farms."],
    bGG: ["Soil Eng.", "Soil Engineers make Soil Camps."],
    mGG: ["Mine Eng.", "Mine Engineers make Mines."],
    dGG: ["Dep. of Education", "Department of Education makes Universities."],
    //  Bee
    A: ["Bee Farmer", "Farm flowers."],
    B: ["Bee Carpenter", "Carpenter Bee."],
    E: ["Bee Miner", "miner Bee."],
    D: ["Bee Scientist", "scientist Bee."],
    AG: ["Flowers Farm", "Farm of flowers."],
    BG: ["Bee Soil Camp", "Bee Soil Camp"],
    EG: ["Bee Mine", "Bee Mine"],
    DG: ["Bee University", "Bee University"],
    AGG: ["Florists Eng. ", "Florists Engineers make Flowers Farms."],
    BGG: ["Bee Soil Eng.", "Bee Soil Engineers make Bee Soil Camps."],
    EGG: ["Bee Mine Eng.", "Bee Mine Engineers make Bee Mines."],
    DGG: ["Bee's Dep. of Education", "Bee's Department of Education"],
    // Wasp
    v: ["Wasp Farmer", "A Farming wasp."],
    V: ["Wasp Carpenter", "A Carpenter Wasp."],
    o: ["Wasp Miner", "A Miner Wasp."],
    p: ["Wasp Scientist", "A Scientist Wasp."],
    vG: ["Wasp Farm", "Waspy Farm."],
    VG: ["Wasp Soil Camp", "Waspy Soil Camp."],
    oG: ["Wasp Mine", "Waspy Mine."],
    pG: ["Wasp University", "Waspy University"],
    vGG: ["Wasp Hydro Eng.", "Wasp Hydro Engineers make Wasp Farms."],
    VGG: ["Wasp Soil Eng.", "Wasp Soil Engineers make Wasp Soil Camp Farms."],
    oGG: ["Wasp Mine Eng.", "Wasp Mine Engineers make Wasp Mines."],
    pGG: [
      "Wasp's Dep. of Education",
      "Wasp's Department of Education make Wasp Universities."
    ],
    //  Super Major
    sm: ["Super Major Helpers", ""],
    lf: ["Leaf Cutter", "Improve Farming."],
    mh: ["Big Miner", "Improve Mining."],
    sh: ["Big Carpenter", "Improve Soil Gathering."],
    //  Kill World
    aow: ["Art of War", "Improve Killers by 10%"]
  },
  worlds: {
    "1Pre": "Hot",
    "2Pre": "Soil",
    "3Pre": "Crystallized",
    "4Pre": "Scientific",
    "1Suf": "of Food",
    "2Suf": "of Soil",
    "3Suf": "of Crystal",
    "4Suf": "of Science",
    fBio: "Farm",
    wBio: "Forest",
    cBio: "Mine",
    sBio: "University",
    fSPre: "Food supply",
    wSPre: "Soil supply",
    cSPre: "Crystal supply",
    fSSuff: "with Food",
    wSSuff: "with Soil",
    cSSuff: "with Crystal",
    //  Bee
    beePre: "Apian",
    beeBio: "Hive",
    beeSuff: "of Bee",
    //  Wasp
    waspPre: "Waspy",
    waspBio: "Nest",
    waspSuff: "of Wasp",
    //  Super Major
    majorPre: "Giant",
    majorSuff: "of Super Major",
    //  Malus Bonus
    mkPre: "Hostile",
    mkBio: "Battlefield",
    mkSuff: "of War",
    //  Larva
    larvaPre: "Swarming",
    larvaSuff: "of Larvae",
    //  Queen
    queenPre: "Queenly",
    queenSuff: "of Queen"
  },
  prestige: {
    //  Followers 1
    e: ["Drone Follower", "Start new worlds with 5 more drones"],
    h: ["Geologist Follower", "Start new worlds with 5 more geologists"],
    i: ["Student Follower", "Start new worlds with 5 more students"],
    //  Followers 2
    a: ["Farmer Follower", "Start new worlds with 5 more farmers"],
    b: ["Carpenter Follower", "Start new worlds with 5 more carpenters"],
    m: ["Miner Follower", "Start new worlds with 5 more miners"],
    d: ["Scientist Follower", "Start new worlds with 5 more scientists"],
    //  Time
    P: ["Time Producer", "+0.1 time/s"],
    B: ["Time Bank", "+1 max hour"],
    //  AutoBuy
    H: ["Hatch Auto Buyer", "Unlock Hatch Auto Buyer for all units"],
    t: ["Team Auto Buyer", "Unlock Team Auto Buyer for all units"],
    T: ["Twin Auto Buyer", "Unlock Twin Auto Buyer for all units"],
    M: ["Time Warp Auto Buyer", "Unlock one minute time warp Auto Buyer"],
    R: ["Research Auto Buyer", "Unlock Research Auto Buyer"],
    //  Technology
    F: ["Farming", "+10% food production"],
    C: ["Carpentry", "+10% soil production"],
    n: ["Mining", "+10% crystal production"],
    s: ["Studying", "+10% science production"],
    //  Team
    E: ["Team Work", "+30% Team Work Bonus"],
    //  Worlds
    w: ["Better World", "+10% World Bonus"],
    r: ["Better Army", "+10% Army killing stuff"],
    L: ["Max Level", "+10% Max World Level"],
    //  Swarm
    sl: ["Larva Bonus", "+10% Larvae production"],
    sq: ["Queen Bonus", "+10% Queen production"]
  },
  actions: {
    warp60: ["Warp minute", "Time warp by minutes"],
    warp3600: ["Warp hour", "Time warp by hours"]
  },
  bug: {
    0: "Ants",
    1: "Bees",
    2: "Wasps",
    3: "Super Major"
  }
};
