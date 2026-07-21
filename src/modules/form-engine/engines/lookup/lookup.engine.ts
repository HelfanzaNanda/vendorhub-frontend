import type { FieldSchema } from '../../interfaces';
import { ObjectUtil } from '../../utils';
import { apiClient } from '@/services/api';

export class LookupEngine {
    static prepareLookupRequest(field: FieldSchema, values: Record<string, unknown>): { endpoint: string, method: string, params: Record<string, unknown> } | null {
        if (!field.lookup) return null;

        const endpoint = field.lookup.endpoint!!;
        const method = field.lookup.method!!;
        const rawParams = field.lookup.params || {};

        const resolvedParams: Record<string, unknown> = {};

        for (const [key, val] of Object.entries(rawParams)) {
            if (typeof val === 'string' && val.startsWith('${') && val.endsWith('}')) {
                const valuePath = val.substring(2, val.length - 1);

                resolvedParams[key] = ObjectUtil.get(values, valuePath);
            } else {
                resolvedParams[key] = val;
            }
        }

        return {
            endpoint,
            method,
            params: resolvedParams
        };
    }

    private static cache = new Map<string, unknown[]>();

    static async load(field: FieldSchema, values: Record<string, unknown>): Promise<unknown[]> {
        if (field.lookup?.type === 'STATIC') {
            return field.lookup.options || [];
        }
        
        const request = this.prepareLookupRequest(field, values);

        if (!request) return [];


        const cacheKey = JSON.stringify(request);

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey) || [];
        }

        try {
            // In a real application, this would use a properly configured HTTP client (e.g., axios/fetch)
            // Here we simulate the network request and use fetch as a baseline.

            const queryParams = new URLSearchParams();

            if (request.method === 'GET') {
                Object.entries(request.params).forEach(([key, val]) => {
                    if (val !== undefined && val !== null) {
                        queryParams.append(key, String(val));
                    }
                });
            }

            const url = request.method === 'GET' && queryParams.toString()
                ? `${request.endpoint}?${queryParams.toString()}`
                : request.endpoint;

            const response = await apiClient.request({
                url: url,
                method: request.method,
                data: request.method !== 'GET' ? request.params : undefined,
            });

            const data = response.data;

            // Assume the API returns an array, or an object containing a 'data' array.
            const result = Array.isArray(data) ? data : (data.data || []);

            this.cache.set(cacheKey, result);

            return result;
        } catch (error) {
            console.error(`LookupEngine failed to load ${field.name}`, error);
            throw error;
        }
    }
}
