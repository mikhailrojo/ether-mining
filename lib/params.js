module.exports = {
	DATASET_BYTES_INIT: 1073741824, // 2^30
	DATASET_BYTES_GROWTH: 8388608,  // 2 ^ 23
	CACHE_BYTES_INIT: 16777216,     // 2**24          # bytes in dataset at genesis
	CACHE_BYTES_GROWTH: 131072,     // 2**17  cache growth per epoch
	CACHE_MULTIPLIER: 1024,         // Size of the DAG relative to the cache
	EPOCH_LENGTH: 30000,            // blocks per epoch
	MIX_BYTES: 128,                 // width of mix
	HASH_BYTES: 64,                 // hash length in bytes
	DATASET_PARENTS: 256,           // number of parents of each dataset element
	CACHE_ROUNDS: 3,                // number of rounds in cache production
	ACCESSES: 64,
	WORD_BYTES: 4
}
