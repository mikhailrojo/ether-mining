const request = require('request-promise-native');
const cl = console.log;


const headers = {
	'User-Agent': 'Super Agent/0.0.1',
	'Content-Type': 'application/json-rpc',
	'Accept': 'application/json-rpc'
};



module.exports = async function(params) {
	const options = {
		url: "http://0.0.0.0:8545",
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'eth_submitWork',
			id: 2,
			params
		})
	};

	try {
		const responseString = await request(options);
		console.log(responseString);
	} catch (e) {
		console.log(e);
		return {};
	}
};

