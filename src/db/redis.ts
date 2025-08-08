
import Redis from "ioredis";

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis ConnectionCreatedEvent')
    }
    throw new Error('Redis Connection Failed');
}

export const connectRedis = new Redis(redisClient())