/** Requires */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const threads = process.env.NODE_ENV === 'development' ? 1 : numCPUs - 1;
const context = require('./init/context');
const server = require('./init/server');

/** Cluster */
if (cluster.isMaster) {
	for (let i = 0; i < threads; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker exited: ${worker.id} \nCode: ${code} \nSignal: ${signal}`);
		// Forks a new process if app crashes
		if (code !== 0) {
			cluster.fork();
		}
	});

	cluster.on('online', (worker) => {
		console.log(`Worker online: ${worker.id}`);
	});

	cluster.on('listening', (worker, address) => {
		console.log(`Worker: ${worker.id}, in listening to address: ${address}`);
	});
} else if (cluster.isWorker) {
	// Main logic

	// Init
	(async () => {
		try {

			// Context
			const appCtx = await context.init();
			console.log('Context initiated successfully');

			// Server
			server.init(appCtx);
			// process.exit(1);
		} catch (err) {
			console.log('@main->err', err);
		}
	})();

	// Handles uncaught exception
	process.on('uncaughtException', (err) => {
		console.log(`Uncaught exception in a thread : ${JSON.stringify(err)}`);
		throw err;
	});

	// Process exits
	process.on('exit', () => {
		console.log('Thread exits');
	});
}
