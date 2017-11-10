function init() {
	return new Promise(async (resolve, reject) => {
		console.log('init hit');
		resolve({
			name: 'Arijit'
		})
	});
}

/** Exports */
module.exports.init = init;