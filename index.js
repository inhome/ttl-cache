"use strict";

function createCache(now) {
  const entries = new Map();
  return {
    set: function (key, value, ttl) { if (!Number.isFinite(ttl) || ttl < 0) throw new RangeError("Invalid ttl"); entries.set(key, { value: value, expires: now() + ttl }); },
    get: function (key) { const item = entries.get(key); if (!item) return undefined; if (now() >= item.expires) { entries.delete(key); return undefined; } return item.value; },
    remove: function (key) { return entries.delete(key); },
    clear: function () { entries.clear(); }
  };
}

function cacheKey(parts) { return JSON.stringify(parts); }

module.exports = { createCache: createCache, cacheKey: cacheKey };
