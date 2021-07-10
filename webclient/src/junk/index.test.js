import { add, subtract } from "./index";

describe("junk", () => {
  describe("add", () => {
    it("should add 2 numbers", () => {
      expect(add(2, 4)).toBe(6);
    });
    it("should add 2 numbers", () => {
      expect(add("hey", false)).toBe(6);
    });
  });
  describe("subtract", () => {
    it("should subtract 2 numbers", () => {
      expect(subtract(4, 2)).toBe(2);
    });
  });
});
