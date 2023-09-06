# ttl-cache

An in-memory cache experiment with an injectable clock.

Run `node test.js` from this folder.

## createCache

TTL uses the injected clock unit. Expiry is inclusive. This simple cache has no automatic size bound.

## cacheKey

Encode arrays of JSON-safe primitive parts without delimiter collisions. Unsupported values need validation before use.

## loadCached

Undefined behaves as a miss. Concurrent misses are not deduplicated by this helper.
