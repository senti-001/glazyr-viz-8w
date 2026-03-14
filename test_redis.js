
const { Redis } = require('ioredis');
const redis = new Redis();

async function test() {
    try {
        await redis.set('test_key', 'hello_glazyr');
        const val = await redis.get('test_key');
        console.log('Redis connected! Val:', val);
        process.exit(0);
    } catch (err) {
        console.error('Redis connection failed:', err);
        process.exit(1);
    }
}

test();
