export class CONSTS {
  static readonly PRICE_LARVAE_0 = new Decimal(1);
  static readonly PRICE_LARVAE_1 = new Decimal(20);
  static readonly PRICE_LARVAE_2 = new Decimal(100);

  static readonly PRICE_0 = new Decimal(20);
  static readonly PRICE_1 = new Decimal(100);
  static readonly PRICE_2 = new Decimal(1e4);
  static readonly PRICE_3 = new Decimal(1e9);

  static readonly PROD_LARVAE = new Decimal(0.1);

  static readonly PROD_GAN = new Decimal(1);
  static readonly CONSUME_GAN = new Decimal(-1);

  static readonly PROD_1 = new Decimal(20);
  static readonly CONSUME_1 = new Decimal(-15);

  static readonly TEAM_PRICE_0 = new Decimal(500);
  static readonly TEAM_PRICE_1 = new Decimal(5e3);
  static readonly TEAM_PRICE_2 = new Decimal(5e4);
  static readonly TEAM_PRICE_3 = new Decimal(5e5);

  static readonly TWIN_PRICE_0 = new Decimal(1e3);
  static readonly TWIN_PRICE_1 = new Decimal(1e4);
  static readonly TWIN_PRICE_2 = new Decimal(1e5);
  static readonly TWIN_PRICE_3 = new Decimal(1e6);

  static readonly RES_PRICE_1 = new Decimal(5e3);
  static readonly RES_PRICE_2 = new Decimal(5e6);
  static readonly RES_PRICE_3 = new Decimal(5e9);

  static readonly BASE_WIN_CONDITION_MATERIALS = new Decimal(1e12);
  static readonly BASE_WIN_CONDITION_OTHER = new Decimal(400);

  static readonly SWARM_PRICE_GROWRATE = 1.01;

  static readonly CHART_COLORS = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.3)", //red
      "rgba(54, 162, 235, 0.3)", //azure
      "rgba(255, 206, 86, 0.3)", //yellow
      "rgba(75, 192, 192, 0.3)", //azzurrino
      "rgba(153, 102, 255, 0.3)", //viola
      "rgba(255, 159, 64, 0.3)" // arancio strano
    ],
    borderColor: [
      "rgba(255,99,132,1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)"
    ]
  };
}
