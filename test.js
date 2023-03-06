"use strict";
var assert = require("assert");
var lib = require("./index");

var time = 0;
var cache = lib.createCache(function () { return time; });
cache.set("a", 3, 10);
assert.strictEqual(cache.get("a"), 3);
time = 10; assert.strictEqual(cache.get("a"), undefined);
assert.throws(function () { cache.set("b", 1, -1); }, RangeError);

