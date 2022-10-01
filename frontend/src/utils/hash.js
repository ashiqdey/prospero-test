/* eslint-disable no-bitwise */

export function getHash(str) {
  if (str.length === 0) {
    return 0;
  }

  let hash = 0;

  for (let i = 0; i < str.length; i += 1) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
