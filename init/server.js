/** Requires */
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../router.js');
const config = require('../config/config.json');

/** Functions */
function init(appCtx) {
	const app = express();
	
	app.set('appCtx', appCtx)

	app.use(bodyParser.json());
	app.use('/', router);
	
	console.log(`Listening @ ${config.port}`);
	app.listen(`${config.port}`);
}

/** Exports */
module.exports.init = init;
