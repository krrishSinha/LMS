

import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;


// import Redis from "ioredis";

// const redisClient = () => {
//     if (process.env.REDIS_URL) {
//         console.log('Redis ConnectionCreatedEvent')
//     }
//     throw new Error('Redis Connection Failed');
// }

// export const redis = new Redis(redisClient())