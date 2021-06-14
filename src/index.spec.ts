import test from "ava";

import { preserveOrder } from "./";

interface Target {
  a: number;
  b: number;
  c: number;
  "0": number;
  "1": number;
}

test("preserveOrder maintains the insertion order of keys", (t) => {
  const target = preserveOrder<Target>({});

  target.b = 1;
  target.a = 1;
  target[1] = 1;
  Object.defineProperty(target, 0, {
    enumerable: true,
    value: 1,
  });

  t.deepEqual(Object.entries(target), [
    ["b", 1],
    ["a", 1],
    ["1", 1],
    ["0", 1],
  ]);
});

test("preserveOrder ignores non-enumerable keys", (t) => {
  const target = preserveOrder<Target>({});

  target.b = 1;
  target.a = 1;
  target[1] = 1;
  Reflect.defineProperty(target, 0, {
    enumerable: false,
    value: 1,
  });

  t.deepEqual(Object.entries(target), [
    ["b", 1],
    ["a", 1],
    ["1", 1],
  ]);
});

test("preserveOrder preserves insertion order when a key is reassigned", (t) => {
  const target = preserveOrder<Target>({});

  target.b = 1;
  target.a = 1;
  target.b = 2;

  t.deepEqual(Object.entries(target), [
    ["b", 2],
    ["a", 1],
  ]);
});

test("preserveOrder appends the key when it is reinitialized", (t) => {
  const target = preserveOrder<Target>({});

  target.b = 1;
  target.a = 1;
  delete target.b;
  target.b = 2;

  t.deepEqual(Object.entries(target), [
    ["a", 1],
    ["b", 2],
  ]);
});
