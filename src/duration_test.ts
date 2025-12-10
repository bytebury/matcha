import { assert } from "@std/assert";
import { Duration } from "./duration.ts";

Deno.test("Duration.fromMilliseconds", () => {
  const duration = Duration.fromMilliseconds(1000);

  assert(duration.toMilliseconds() === 1000);
  assert(duration.toSeconds() === 1);
  assert(duration.toMinutes() === 1 / 60);
  assert(duration.toHours() === 1 / 3_600);
  assert(duration.toDays() === 1 / 86_400);
  assert(duration.toWeeks() === 1 / 604_800);
  assert(duration.toYears() === 1 / 31_536_000);
});

Deno.test("Duration.fromSeconds", () => {
  const duration = Duration.fromSeconds(1);

  assert(duration.toMilliseconds() === 1000);
  assert(duration.toSeconds() === 1);
  assert(duration.toMinutes() === 1 / 60);
  assert(duration.toHours() === 1 / 3_600);
  assert(duration.toDays() === 1 / 86_400);
  assert(duration.toWeeks() === 1 / 604_800);
  assert(duration.toYears() === 1 / 31_536_000);
});

Deno.test("Duration.fromMinutes", () => {
  const duration = Duration.fromMinutes(1);

  assert(duration.toMilliseconds() === 60_000);
  assert(duration.toSeconds() === 60);
  assert(duration.toMinutes() === 1);
  assert(duration.toHours() === 1 / 60);
});

Deno.test("Duration.fromHours", () => {
  const duration = Duration.fromHours(1);

  assert(duration.toMilliseconds() === 3_600_000);
  assert(duration.toSeconds() === 3_600);
  assert(duration.toMinutes() === 60);
  assert(duration.toHours() === 1);
  assert(duration.toDays() === 1 / 24);
});

Deno.test("Duration.fromDays", () => {
  const duration = Duration.fromDays(1);

  assert(duration.toMilliseconds() === 86_400_000);
  assert(duration.toSeconds() === 86_400);
  assert(duration.toMinutes() === 1_440);
  assert(duration.toHours() === 24);
  assert(duration.toDays() === 1);
  assert(duration.toWeeks() === 1 / 7);
  assert(duration.toYears() === 1 / 365);
});

Deno.test("Duration.fromWeeks", () => {
  const duration = Duration.fromWeeks(1);

  assert(duration.toMilliseconds() === 604_800_000);
  assert(duration.toSeconds() === 604_800);
  assert(duration.toMinutes() === 10_080);
  assert(duration.toHours() === 168);
  assert(duration.toDays() === 7);
  assert(duration.toWeeks() === 1);
});

Deno.test("Duration.fromYears", () => {
  const duration = Duration.fromYears(1);

  assert(duration.toDays() === 365);
  assert(duration.toYears() === 1);
});
