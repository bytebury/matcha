import { assert } from "@std/assert";
import { isEven, isOdd, ordinalize } from "./numbers.ts";

Deno.test("isEven", () => {
  assert(isEven(null as unknown as number) === true);
  assert(isEven(1) === false);
  assert(isEven(2) === true);
  assert(isEven(3) === false);
  assert(isEven(4) === true);
  assert(isEven(11) === false);
  assert(isEven(21) === false);
  assert(isEven(112) === true);
});

Deno.test("isOdd", () => {
  assert(isOdd(null as unknown as number) === false);
  assert(isOdd(1) === true);
  assert(isOdd(2) === false);
  assert(isOdd(3) === true);
  assert(isOdd(4) === false);
  assert(isOdd(11) === true);
  assert(isOdd(21) === true);
  assert(isOdd(112) === false);
});

Deno.test("ordinalize", () => {
  assert(ordinalize(1) === "1st");
  assert(ordinalize(2) === "2nd");
  assert(ordinalize(3) === "3rd");
  assert(ordinalize(4) === "4th");
  assert(ordinalize(11) === "11th");
  assert(ordinalize(21) === "21st");
  assert(ordinalize(112) === "112th");
});
