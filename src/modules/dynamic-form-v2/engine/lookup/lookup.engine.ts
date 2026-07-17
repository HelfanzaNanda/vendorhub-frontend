import { FieldSchema } from '../../interfaces';
import { ObjectUtil } from '../../utils';

export class LookupEngine {
  static prepareLookupRequest(field: FieldSchema, values: Record<string, unknown>): { endpoint: string, method: string, params: Record<string, unknown> } | null {
    if (!field.lookup) return null;

    const endpoint = field.lookup.endpoint;
    const method = field.lookup.method;
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
}
