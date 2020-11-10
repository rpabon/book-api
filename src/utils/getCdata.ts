import { Cdata } from '../models/Cdata';

export function getCdata(obj: Cdata | string | number): string {
  if (typeof obj === 'string' || typeof obj === 'number') {
    return String(obj);
  }

  return (obj && obj.__cdata) || '';
}
