const MR = require('miller-rabin');
const params = require('./params');
const ethUtil = require('ethereumjs-util');
const BN = ethUtil.BN;
const BigNumber = require('bignumber.js');

function getFullSize(epoc) {
	const mr = new MR();
	let sz = params.DATASET_BYTES_INIT + params.DATASET_BYTES_GROWTH * epoc;
	sz -= params.MIX_BYTES;
	while (!mr.test(new BN(sz / params.MIX_BYTES))) {
		sz -= 2 * params.MIX_BYTES
	}
	return sz
}

function getCacheSize(epoc) {
	var mr = new MR();
	var sz = params.CACHE_BYTES_INIT + params.CACHE_BYTES_GROWTH * epoc
	sz -= params.HASH_BYTES
	while (!mr.test(new BN(sz / params.HASH_BYTES))) {
		sz -= 2 * params.HASH_BYTES
	}
	return sz
}

const getEpoc = (blockNumber) => Math.floor(blockNumber / params.EPOCH_LENGTH);

function decimalToHexBuffer(d, padding) {
	var hex = Number(d).toString(16);
	padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	return new Buffer(hex, 'hex');
}

function decimalToHex(d) {
	var hex = Number(d).toString(16);
	const padding = 16

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	return `0x${hex}`;
}

const getStringOfBuffer = (buffer) => `0x${buffer.toString('hex')}`;

function isHashLessThenTarget(hash, target) {
	const hashString = getStringOfBuffer(hash);
	const targetBigNumber = new BigNumber(target);
	const hashBigNumber = new BigNumber(hashString);
	return hashBigNumber.lt(targetBigNumber);
}

module.exports = {
	getFullSize,
	getCacheSize,
	getEpoc,
	decimalToHexBuffer,
	getStringOfBuffer,
	isHashLessThenTarget,
	decimalToHex
};

