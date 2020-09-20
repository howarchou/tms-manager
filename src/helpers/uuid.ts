/**
 *  Created by pw on 2020/9/20 11:47 上午.
 */
export default uuid;

export function uuid(length?: number, radix?: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  radix = radix || chars.length;

  if (length) {
    // Compact form
    let i = -1;
    while (++i < length) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
    return uuid.join('');
  }

  // rfc4122, version 4 form
  let r;

  // rfc4122 requires these characters
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';

  // Fill in random data.  At i==19 set the high bits of clock sequence as
  // per rfc4122, sec. 4.1.5

  let i = -1;
  while (++i < 36) {
    if (!uuid[i]) {
      r = 0 | (Math.random() * 16);
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
    }
  }

  return uuid.join('');
}
