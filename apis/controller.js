function set(appCtx) {
	return new Promise(async(resolve, reject) => {
		return resolve({
			err: null,
			result:'Hi!'
		});
	});
}

/** Exports */
module.exports.set = set;
