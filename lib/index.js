const {getStringOfBuffer, isHashLessThenTarget, decimalToHex, getHeaderHashFullSizeAndTarget} = require('./helpers');
const submitWork = require('./submitWork');
const getWork = require('./getWork');
const init = require('./init');
const BIGGEST_NONCE = 2 ** 64;
const cl = console.log;

(async () => {
	try {
		// get some work from Geth
		const [header, seed, target] = await getWork();
		const {headerHash, fullSize, targetNumber} = getHeaderHashFullSizeAndTarget(header, target);
		let nonce = -1;
		do {
			++nonce;
			// apply ethash.run and get mix and hash
			var {mix, hash} = init(headerHash, fullSize, nonce);
			var isLess = isHashLessThenTarget(hash, targetNumber);
			cl(`Nonce: ${nonce} is ${isLess}`);
		} while (!isLess);

		// it is found - send work to geth back
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