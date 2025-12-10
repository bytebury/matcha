import {
  assert,
  assertEquals,
  assertFalse,
  assertNotStrictEquals,
  assertStrictEquals,
} from "@std/assert";

import {
  average,
  clone,
  distinct,
  falsy,
  first,
  isEmpty,
  isEqual,
  isEqualIgnoreCase,
  isNone,
  isNotEmpty,
  isNotEqual,
  isNotEqualIgnoreCase,
  isSome,
  last,
  rand,
  reverse,
  sample,
  stringify,
  sum,
  truthy,
  unique,
} from "../src/core.ts";
import type { NonEmptyList } from "./utility_types.ts";

// isEqual
Deno.test("isEqual: numbers and strings", () => {
  assert(isEqual("1", 1));
  assertFalse(isEqual(false, " false "));
});

Deno.test("isEqual: objects", () => {
  assert(isEqual({ foo: "bar" }, { foo: "bar" }));
});

Deno.test("isEqual: empty arrays", () => {
  assert(isEqual([], []));
});

Deno.test("isEqual: different arrays", () => {
  assertFalse(isEqual([0], [1]));
});

Deno.test("isEqual: different strings/cases", () => {
  assertFalse(isEqual(false, "FALSE"));
  assertFalse(isEqual("hello", "world"));
});

// isNotEqual
Deno.test("isNotEqual basic behavior", () => {
  assertFalse(isNotEqual("1", 1));
  assert(isNotEqual("2", 1));
  assertFalse(isNotEqual({ foo: "bar" }, { foo: "bar" }));
  assert(isNotEqual([], [1]));
  assert(isNotEqual("false ", "false"));
  assertFalse(isNotEqual("false", false));
});

// isEqualIgnoreCase
Deno.test("isEqualIgnoreCase basic comparisons", () => {
  assert(isEqualIgnoreCase("1", 1));
  assertFalse(isEqualIgnoreCase(false, " false "));
  assert(isEqualIgnoreCase(false, "FALSE"));
});

Deno.test("isEqualIgnoreCase objects", () => {
  assert(isEqualIgnoreCase({ foo: "bar" }, { foo: "bar" }));
  assert(isEqualIgnoreCase({ Foo: "BAR" }, { foo: "bar" }));
});

Deno.test("isEqualIgnoreCase arrays", () => {
  assert(isEqualIgnoreCase([], []));
  assertFalse(isEqualIgnoreCase([0], [1]));
});

Deno.test("isEqualIgnoreCase different strings", () => {
  assertFalse(isEqualIgnoreCase("hello", "world"));
});

// isNotEqualIgnoreCase
Deno.test("isNotEqualIgnoreCase basic behavior", () => {
  assertFalse(isNotEqualIgnoreCase("1", 1));
  assert(isNotEqualIgnoreCase("2", 1));
});

Deno.test("isNotEqualIgnoreCase arrays/objects", () => {
  assert(isNotEqualIgnoreCase([0], [1]));
  assertFalse(isNotEqualIgnoreCase({ foo: "bar" }, { foo: "bar" }));
});

Deno.test("isNotEqualIgnoreCase booleans", () => {
  assert(isNotEqualIgnoreCase(false, " false "));
  assert(isNotEqualIgnoreCase(false, "false_not"));
  assertFalse(isNotEqualIgnoreCase(false, "FALSE"));
});

// stringify
Deno.test("stringify converts values to strings", () => {
  assertStrictEquals(stringify({ a: 1 }), JSON.stringify({ a: 1 }));
  assertStrictEquals(stringify([1, 2, 3]), "[1,2,3]");
  assertStrictEquals(stringify(42), "42");
  assertStrictEquals(stringify("hello"), "hello");
});

// clone
Deno.test("clone deep copies", () => {
  const obj = { a: 1 };
  const arr = [1, 2, 3];

  const clonedObj = clone(obj);
  const clonedArr = clone(arr);

  assertEquals(clonedObj, obj);
  assertNotStrictEquals(clonedObj, obj);

  assertEquals(clonedArr, arr);
  assertNotStrictEquals(clonedArr, arr);
});

// reverse
Deno.test("reverse strings", () => {
  assertStrictEquals(reverse("abc"), "cba");
});

Deno.test("reverse arrays", () => {
  assertEquals(reverse([1, 2, 3]), [3, 2, 1]);
});

Deno.test("reverse sets", () => {
  assertEquals(reverse(new Set([1, 2, 3])), new Set([3, 2, 1]));
});

// isEmpty
Deno.test("isEmpty base cases", () => {
  assert(isEmpty(null));
  assert(isEmpty(undefined));
});

Deno.test("isEmpty strings", () => {
  assert(isEmpty(""));
  assert(isEmpty("   "));
  assert(isEmpty("\n\t"));
  assertFalse(isEmpty("Hello"));
});

Deno.test("isEmpty arrays", () => {
  assert(isEmpty([]));
  assertFalse(isEmpty([1, 2]));
});

Deno.test("isEmpty objects", () => {
  assert(isEmpty({}));
  assertFalse(isEmpty({ foo: "bar" }));
});

Deno.test("isEmpty Set and Map", () => {
  assert(isEmpty(new Set()));
  assert(isEmpty(new Map()));
  assertFalse(isEmpty(new Set([1])));
  assertFalse(isEmpty(new Map([["key", "value"]])));
});

// isNotEmpty
Deno.test("isNotEmpty behavior", () => {
  assertFalse(isNotEmpty(null));
  assertFalse(isNotEmpty(""));
  assert(isNotEmpty("Hello"));
  assert(isNotEmpty([1]));
  assertFalse(isNotEmpty([]));
  assert(isNotEmpty({ foo: "bar" }));
  assertFalse(isNotEmpty({}));
  assert(isNotEmpty(new Set([1])));
  assertFalse(isNotEmpty(new Set()));
});

// unique
Deno.test("unique produces distinct values", () => {
  assertEquals(unique([1, 2, 2, 3]), [1, 2, 3]);
  assertEquals(unique(["a", "b", "a"]), ["a", "b"]);
  assertEquals(unique([]), []);
});

// distinct
Deno.test("distinct is alias for unique", () => {
  assertEquals(distinct([1, 2, 2, 3]), [1, 2, 3]);
  assertEquals(distinct(["x", "x", "y"]), ["x", "y"]);
});

// sample
Deno.test("sample empty array", () => {
  assertStrictEquals(sample([] as unknown as NonEmptyList<unknown>), undefined);
});

Deno.test("sample non-empty", () => {
  const list: NonEmptyList<number> = [1, 2, 3, 4, 5];
  const result = sample(list);
  assert(list.includes(result as number));
});

// truthy
Deno.test("truthy detection", () => {
  assert(truthy(true));
  assert(truthy(1));
  assert(truthy("non-empty"));

  assertFalse(truthy(false));
  assertFalse(truthy(0));
  assertFalse(truthy(""));
  assertFalse(truthy(null));
  assertFalse(truthy(undefined));
});

// falsy
Deno.test("falsy detection", () => {
  assert(falsy(false));
  assert(falsy(0));
  assert(falsy(""));
  assert(falsy(null));
  assert(falsy(undefined));

  assertFalse(falsy(true));
  assertFalse(falsy(1));
  assertFalse(falsy("hello"));
});

// last
Deno.test("last string", () => {
  assertStrictEquals(last("hello world"), "d");
  assertStrictEquals(last("o"), "o");
});

Deno.test("last array", () => {
  assertStrictEquals(last([1]), 1);
  assertStrictEquals(last([1, 2, 3]), 3);
});

// first
Deno.test("first string", () => {
  assertStrictEquals(first("hello world"), "h");
  assertStrictEquals(first("o"), "o");
});

Deno.test("first array", () => {
  assertStrictEquals(first([1]), 1);
  assertStrictEquals(first([1, 2, 3]), 1);
});

// rand
Deno.test("rand boundaries with mocked Math.random", () => {
  const original = Math.random;

  Math.random = () => 0;
  assertStrictEquals(rand(3, 7), 3);

  Math.random = () => 0.9999999;
  assertStrictEquals(rand(3, 7), 6);

  Math.random = original;
});

Deno.test("rand range sampling", () => {
  for (let i = 0; i < 100; i++) {
    const v = rand(0, 5);
    assert(v >= 0);
    assert(v < 5);
  }
});

// isSome
Deno.test("isSome behavior", () => {
  assertFalse(isSome(null));
  assertFalse(isSome(undefined));

  assert(isSome(0));
  assert(isSome(1));
  assert(isSome(""));
  assert(isSome("Something"));
  assert(isSome([]));
});

// isNone
Deno.test("isNone behavior", () => {
  assert(isNone(null));
  assert(isNone(undefined));

  assertFalse(isNone(0));
  assertFalse(isNone(1));
  assertFalse(isNone(""));
  assertFalse(isNone("Something"));
  assertFalse(isNone([]));
});

// sum
Deno.test("sum numbers", () => {
  assertStrictEquals(sum([1, 2, 3]), 6);
  assertStrictEquals(sum([1, 2, 3, 4]), 10);
  assertStrictEquals(sum([1, 2, 3, 4, 5]), 15);
});

Deno.test("sum keyed objects", () => {
  assertStrictEquals(
    sum([{ value: 1 }, { value: 2 }, { value: 3 }], "value"),
    6,
  );
  assertStrictEquals(sum([{ value: 1 }, { value: -1 }], "value"), 0);
});

Deno.test("sum empty array", () => {
  assertStrictEquals(sum([]), 0);
});

// average
Deno.test("average numbers", () => {
  assertStrictEquals(average([1, 2, 3]), 2);
  assertStrictEquals(average([1, 2, 3, 4]), 2.5);
  assertStrictEquals(average([1, 2, 3, 4, 5]), 3);
});

Deno.test("average keyed objects", () => {
  assertStrictEquals(
    average([{ value: 1 }, { value: 2 }, { value: 3 }], "value"),
    2,
  );
  assertStrictEquals(average([{ value: 1 }, { value: -1 }], "value"), 0);
  assertEquals(
    average([
      { age: 10 },
      { age: 18 },
      { age: 12 },
    ], "age"),
    13.333333333333334,
  );
});

Deno.test("average empty array", () => {
  assertStrictEquals(average([]), 0);
});
