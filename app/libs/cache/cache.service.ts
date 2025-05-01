import { CacheInterface } from "./cache.interface.js";

export class CacheService {
    private cache: CacheInterface;

    constructor(cache: CacheInterface) {
        this.cache = cache;
    }

    async get(key: string): Promise<any> {
        return this.cache.get(key);
    }

    async set(key: string, value: any, ttl: number): Promise<void> {
        await this.cache.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        await this.cache.delete(key);
    }

    async flush(): Promise<void> {
        await this.cache.flush();
    }
}