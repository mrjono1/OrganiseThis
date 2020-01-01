/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepClone = <T>(obj: T): T => {
  // Handle the 3 simple types, and null or undefined
  if (obj === null || obj === undefined || 'object' !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return (copy as unknown) as T;
  }

  // Handle Array
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return (copy as unknown) as T;
  }

  // Handle Object
  if (obj instanceof Object) {
    const copy = {};
    for (const attr in obj) {
      if ((obj as any).hasOwnProperty(attr)) {
        (copy as any)[attr] = deepClone(obj[attr]);
      }
    }
    return copy as T;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};
