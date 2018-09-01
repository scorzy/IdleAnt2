import { FormatPipe } from "./format.pipe";
import { OptionsService } from "./options.service";

describe("FormatPipe", () => {
  const options = new OptionsService();
  options.generateFormatter();

  it("create an instance", () => {
    const pipe = new FormatPipe(options);
    expect(pipe).toBeTruthy();
  });
  it("Euro format", () => {
    const optionsEu = new OptionsService();
    optionsEu.usaFormat = false;
    const pipeEuro = new FormatPipe(optionsEu);

    expect(pipeEuro.transform(1.23)).toBe("1,23");
    expect(pipeEuro.transform(12.3)).toBe("12,3");
    expect(pipeEuro.transform(123.4)).toBe("123");
    expect(pipeEuro.transform(1, true)).toBe("1");
    expect(pipeEuro.transform(1234, true)).toBe("1.234");
  });
  it("Usa format", () => {
    const optionsUs = new OptionsService();
    optionsUs.usaFormat = true;
    const pipeUsa = new FormatPipe(optionsUs);

    expect(pipeUsa.transform(4.56)).toBe("4.56");
    expect(pipeUsa.transform(45.6)).toBe("45.6");
    expect(pipeUsa.transform(456.7)).toBe("456");
    expect(pipeUsa.transform(2, true)).toBe("2");
    expect(pipeUsa.transform(4567, true)).toBe("4,567");
  });
  it("Standard format", () => {
    const pipe = new FormatPipe(options);
    options.numFormat = "standard";
    options.generateFormatter();
    expect(pipe.transform(1e100, true)).toBe("10,0DTg");
  });
});
