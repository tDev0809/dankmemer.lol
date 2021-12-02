import Redis from "ioredis";

let port = process.env.REDIS_PORT;
let host = process.env.REDIS_HOST;

let cachedClient: Redis.Redis;

if (!port) {
	throw new Error(
		"Please define the REDIS_PORT environment variable inside .env"
	);
}

if (!host) {
	throw new Error(
		"Please define the REDIS_HOST environment variable inside .env"
	);
}

export async function redisConnect() {
	if (cachedClient) {
		return cachedClient;
	}

	const redis = new Redis(parseInt(port!), host!);

	cachedClient = redis;

	return redis;
}
