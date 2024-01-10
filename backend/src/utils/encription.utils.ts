import * as crypto from 'crypto';

export const stringHash = (s: string) => crypto.createHash('sha1').update(s, 'utf8').digest('hex');
