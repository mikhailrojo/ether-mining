const request = require('request-promise-native');
const cl = console.log;


const headers = {
	'User-Agent': 'Super Agent/0.0.1',
	'Content-Type': 'application/json-rpc',
	'Accept': 'application/json-rpc'
};

const options = {
	url: "http://0.0.0.0:8545",
	method: 'POST',
	headers: headers,
	body: JSON.stringify({
		jsonrpc: '2.0',
		method: 'eth_getWork',
		id: 1
	})
};

module.exports = async function() {
	try {
		const responseString = await request(options);
		const {result} = JSON.parse(responseString);
		cl(result);
		return result;
	} catch (e) {
		console.log(e);
		return {};
	}
};

