const {getStringOfBuffer, isHashLessThenTarget, decimalToHex} = require('./helpers');
const submitWork = require('./submitWork');
const getWork = require('./getWork');
const init = require('./init');
const BIGGEST_NONCE = 2 ** 64;
const cl = console.log;

(async () => {
	try {
		// get some work from Geth
		const [header, seed, target] = await getWork();
		let nonce = -1;
		do {
			++nonce;
			// apply ethash.run and get mix and hash
			var {mix, hash} = init(header, seed, nonce);
			var isLess = isHashLessThenTarget(hash, target);
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