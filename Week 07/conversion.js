function string2Number(string) {
  return Number(string);
}

function number2String(number, radix = 10) {
  const r = Number(radix);
  if (Number.isNaN(r) || r < 2 || r > 36) {
    throw new Error('radix is not between 2 and 36.');
  }
  return Number(number).toString(r);
}