import { FormatPipe } from "./format.pipe";
import { OptionsService } from "./options.service";

describe("FormatPipe", () => {
  let options: OptionsService;

  options = new OptionsService();
  options.generateFormatter();

  it("create an instance", () => {
    const pipe = new FormatPipe(options);
    expect(pipe).toBeTruthy();
  });
  describe("Euro format", () => {
    const optionsEu = new OptionsService();
    optionsEu.usaFormat = false;
    const pipeEuro = new FormatPipe(optionsEu);

    it("1,23", () => {
      expect(pipeEuro.transform(1.23)).toBe("1,23");
    });
    it("12,3", () => {
      expect(pipeEuro.transform(12.3)).toBe("12,3");
    });
    it("123,4", () => {
      expect(pipeEuro.transform(123.4)).toBe("123");
    });
    it("1", () => {
      expect(pipeEuro.transform(1, true)).toBe("1");
    });
  });
  describe("Usa format", () => {
    const optionsUs = new OptionsService();
    optionsUs.usaFormat = true;
    const pipeUsa = new FormatPipe(optionsUs);

    it("4.56", () => {
      expect(pipeUsa.transform(4.56)).toBe("4.56");
    });
    it("45.6", () => {
      expect(pipeUsa.transform(45.6)).toBe("45.6");
    });
    it("456.7", () => {
      expect(pipeUsa.transform(456.7)).toBe("456");
    });
    it("2", () => {
      expect(pipeUsa.transform(2, true)).toBe("2");
    });
  });
});
