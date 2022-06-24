import { Injectable } from '@angular/core';

@Injectable ({
    providedIn: 'root'
})

export class CacheService {
    getCache(key: string) {
        try {
            const item = window.localStorage.getItem(key) as string;

            return JSON.parse(item);
        }
        catch (err)
        {
            return null;
        }
    }

    setCache(key: string, item: Object) {
        window.localStorage.setItem(key, JSON.stringify(item));
    }
}