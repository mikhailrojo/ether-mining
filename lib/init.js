const Ethash = require('ethashjs');
const levelup = require('levelup');
const memdown = require('memdown');
const Header = require('ethereumjs-block/header.js');
const ethUtil = require('ethereumjs-util');
const cl = console.log;

const {getFullSize, getCacheSize, getEpoc, decimalToHexBuffer} = require('./helpers');
const getHeader = (hex) => new Header(new Buffer(hex, 'hex'));

const SEED_ON_TESTNET = '0x0000000000000000000000000000000000000000000000000000000000000000';
const CONSTANT_CASH_SIZE = 21102272;

const cacheDb = levelup('', {
	db: memdown
});
const ethash = new Ethash(cacheDb);
ethash.mkcache(CONSTANT_CASH_SIZE, SEED_ON_TESTNET );


module.exports = function (headerString, seed, nonceInt) {
	const header = getHeader(headerString);
	const headerHash = ethash.headerHash(header.raw);
	const BlockNumber = ethUtil.bufferToInt(header.number);
	const epoc = getEpoc(BlockNumber);
	const cacheSize = getCacheSize(epoc);

	if (cacheSize !== CONSTANT_CASH_SIZE) {
		throw new Error(`cache size Changed, new one is ${cacheSize}`);
	}

	const fullSize = getFullSize(epoc);
	const nonce = decimalToHexBuffer(nonceInt);

	return ethash.run(headerHash, nonce, fullSize);
};