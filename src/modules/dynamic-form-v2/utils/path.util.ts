export class PathUtil {
  static toPathArray(path: string | (string | number)[]): (string | number)[] {
    if (Array.isArray(path)) return path;
    return path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
  }
}
