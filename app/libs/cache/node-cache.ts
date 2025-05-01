import { CacheInterface } from "./cache.interface.js";
import nodeCache from "node-cache";

export class NodeCache implements CacheInterface {
    private cache: nodeCache;

    constructor() {
        this.cache = new nodeCache();
    }

    async get(key: string): Promise<any> {
        return this.cache.get(key);
    }
    
    async set(key: string, value: any, ttl = 3600): Promise<void> {
        this.cache.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        this.cache.del(key);
    }

    async flush(): Promise<void> {
        this.cache.flushAll();
    }
}
