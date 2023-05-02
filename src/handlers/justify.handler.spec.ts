import assert from "assert";
import { breakText } from "./justify.handler";
import fs from "fs";
// const assert = require("assert");
// const { breakText } = require("./justify.handler");
// const fs = require("fs");

describe("breakTest", () => {
  it("returns a string in which each line is cut by 80 letters", () => {
    console.debug("HERE");
    // console.debug(input);
    try {
      const input = fs.readFileSync("./test/input.txt");
      breakText(input.toString());
    } catch (error) {
      console.log(error);
    }
    // const result = breakText(text);

    // assert.strictEqual(expected, result);
  });
});
