const Ethash = require('ethashjs');
const levelup = require('levelup');
const memdown = require('memdown');
const Header = require('ethereumjs-block/header.js');
const ethUtil = require('ethereumjs-util');

const {getFullSize, getCacheSize, getEpoc, decimalToHexBuffer} = require('./helpers');
const getHeader = (hex) => new Header(new Buffer(hex, 'hex'));

const cacheDb = levelup('', {
	db: memdown
});
const ethash = new Ethash(cacheDb);


module.exports = function (headerString, seed, nonceInt) {
	console.log('we start');
	const header = getHeader(headerString);
	const headerHash = ethash.headerHash(header.raw);
	const BlockNumber = ethUtil.bufferToInt(header.number);
	const epoc = getEpoc(BlockNumber);
	const cacheSize = getCacheSize(epoc);
	const fullSize = getFullSize(epoc);
	const nonce = decimalToHexBuffer(nonceInt);

	ethash.mkcache(cacheSize, seed);
	return ethash.run(headerHash, nonce, fullSize);
};