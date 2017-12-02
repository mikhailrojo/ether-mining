
const BigNumber = require('bignumber.js');
const {getStringOfBuffer, isHashLessThenTarget, decimalToHex} = require('./helpers');

const submitWork = require('./submitWork');
const getWork = require('./getWork');
const init = require('./init');
const BIGGEST_NONCE = 2 ** 64;
const cl = console.log;

(async () => {
	try {
		const [header, seed, target] = await getWork();
		let nonce = -1;
		do {
			++nonce;
			var {mix, hash} = init(header, seed, nonce);
			var isLess = isHashLessThenTarget(hash, target);
			cl(`Nonce: ${nonce} is ${isLess}`);
		} while (!isLess);

		const nonceString = decimalToHex(nonce);
		const headerHashString = getStringOfBuffer(hash);
		const mixString = getStringOfBuffer(mix);

		const paramsToSubmit = [
			nonceString,
			headerHashString,
			mixString
		];
		cl(paramsToSubmit);
		submitWork(paramsToSubmit);


	} catch (e) {
		console.log(e);
	}


})();




// const cl = console.log;
// const {getFullSize, getCacheSize, getEpoc, getStringOfBuffer} = require('./helpers');
//
// const hashBigNumber = new BigNumber('0x' + hexHash);
// const difficultyBigNumber = new BigNumber('0x00007fa047ca2861b6b6f6c6eacfe414f04bc72aa007fa047ca2861b6b6f6c6e');
//
// //cl(hashBigNumber.lt(difficultyBigNumber));
//
// const nonceString = getStringOfBuffer(nonce);
// const headerHashString = getStringOfBuffer(r.hash);
// const mixString = getStringOfBuffer(r.mix);
//
// const paramsToSubmit = [
// 	nonceString,
// 	headerHashString,
// 	mixString
// ];
// cl(paramsToSubmit);
// submitWork(paramsToSubmit);
//



