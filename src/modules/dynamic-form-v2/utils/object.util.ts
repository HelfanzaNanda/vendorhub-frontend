import { PathUtil } from './path.util';

export class ObjectUtil {
  static clone<T>(obj: T): T {
    if (obj === undefined) return obj;
    return JSON.parse(JSON.stringify(obj));
  }

  static get(obj: Record<string, unknown>, path: string | (string | number)[], defaultValue?: unknown): unknown {
    const pathArray = PathUtil.toPathArray(path);
    let current: any = obj;
    for (const key of pathArray) {
      if (current == null) return defaultValue;
      current = current[key];
    }
    return current === undefined ? defaultValue : current;
  }

  static set(obj: Record<string, unknown>, path: string | (string | number)[], value: unknown): Record<string, unknown> {
    const cloned = ObjectUtil.clone(obj) as any;
    const pathArray = PathUtil.toPathArray(path);
    let current = cloned;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (current[key] == null) {
        current[key] = typeof pathArray[i + 1] === 'number' || !isNaN(Number(pathArray[i + 1])) ? [] : {};
      }
      current = current[key];
    }
    
    if (pathArray.length > 0) {
      current[pathArray[pathArray.length - 1]] = value;
    }
    
    return cloned;
  }

  static unset(obj: Record<string, unknown>, path: string | (string | number)[]): Record<string, unknown> {
    const cloned = ObjectUtil.clone(obj) as any;
    const pathArray = PathUtil.toPathArray(path);
    let current = cloned;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (current[key] == null) return cloned;
      current = current[key];
    }
    
    if (pathArray.length > 0) {
      const lastKey = pathArray[pathArray.length - 1];
      if (Array.isArray(current)) {
        current.splice(Number(lastKey), 1);
      } else {
        delete current[lastKey];
      }
    }
    
    return cloned;
  }
}
