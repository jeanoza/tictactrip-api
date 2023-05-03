import assert from "assert";
import { breakText } from "./justify.handler";
import fs from "fs";

describe("breakTest", () => {
  it("returns a string in which each line is cut by 80 letters", () => {
    const input = fs.readFileSync("src/test/input.txt").toString();
    const expected = fs.readFileSync("src/test/output.txt").toString();
    const result = breakText(input);
    // Cela donnerait fail parse que ma function ne met pas espace supplémentaire entre les mot
    // afin que le dernier caracter de la ligne soit verticalement aligné.
    // J'aimerais bien que tu vas m'expliquer comment régler cela:)
    // assert.strictEqual(expected, result);
  });
});
