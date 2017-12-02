const Ethash = require('ethashjs');
const levelup = require('levelup');
const memdown = require('memdown');
const {decimalToHexBuffer} = require('./helpers');
const cl = console.log;

const SEED_ON_TESTNET = '0x0000000000000000000000000000000000000000000000000000000000000000';
const CONSTANT_CASH_SIZE = 21102272;

const cacheDb = levelup('', {db: memdown});
const ethash = new Ethash(cacheDb);

ethash.mkcache(CONSTANT_CASH_SIZE, SEED_ON_TESTNET);

module.exports = function (headerHash, fullSize, nonceInt) {
	const nonce = decimalToHexBuffer(nonceInt);

	return ethash.run(headerHash, nonce, fullSize);
};
