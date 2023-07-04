"use strict";
var assert = require("assert");
var lib = require("./index");

var time = 0;
var cache = lib.createCache(function () { return time; });
cache.set("a", 3, 10);
assert.strictEqual(cache.get("a"), 3);
time = 10; assert.strictEqual(cache.get("a"), undefined);
assert.throws(function () { cache.set("b", 1, -1); }, RangeError);

assert.notStrictEqual(lib.cacheKey(["a:b", "c"]), lib.cacheKey(["a", "b:c"]));
assert.strictEqual(lib.cacheKey(["x", 1]), '["x",1]');

async function checkLoad() {
  var calls = 0, c = lib.createCache(function () { return 0; });
  var loader = async function () { calls++; return 4; };
  assert.strictEqual(await lib.loadCached(c, "x", 100, loader), 4);
  assert.strictEqual(await lib.loadCached(c, "x", 100, loader), 4);
  assert.strictEqual(calls, 1);
}
checkLoad().catch(function (error) { console.error(error); process.exitCode = 1; });

