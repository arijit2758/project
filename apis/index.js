/** Requires */
const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

/** Routes */
router.get('/', async(request, response) => {
	const appCtx = request.app.get('appCtx');

	const { err, result } = await controller.set(appCtx, request.query);
	if (err) {
		response.send(err);
		return;
	}
	response.send(result);
	return
});

router.post('/', async(request, response) => {
	const appCtx = request.app.get('appCtx');

	const { err, result } = await controller.set(appCtx, request.body);
	if (err) {
		response.send(err);
		return;
	}
	response.send(result);
	return
});

/** Exports */
module.exports = router;