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

async function loadCached(cache, key, ttl, loader) {
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const value = await loader();
  cache.set(key, value, ttl);
  return value;
}

function createSingleFlight() {
  const running = new Map();
  return function (key, operation) {
    if (running.has(key)) return running.get(key);
    const promise = Promise.resolve().then(operation).finally(function () { running.delete(key); });
    running.set(key, promise); return promise;
  };
}

module.exports = { createCache: createCache, cacheKey: cacheKey, loadCached: loadCached, createSingleFlight: createSingleFlight };
