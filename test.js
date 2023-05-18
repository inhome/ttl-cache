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

