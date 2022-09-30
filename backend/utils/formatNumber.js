

exports.checkNan = (n, key, valids) => {
  if (!n) {
    return 0;
  }

  n = parseInt(n, 10);

  // if not number
  if (Number.isNaN(n)) {
    throw new Error(`${key} should be a number`);
  }

  // check if value is available in valids array
  if (valids && !valids.includes(n)) {
    throw new Error(`${key} should be either of ${valids.join(',')}`);
  }

  return n;
}
