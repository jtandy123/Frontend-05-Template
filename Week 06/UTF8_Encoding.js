function UTF8_Encoding(string) {
  let bs = '';
  for (let s of string) {
    bs += ',' + codePoint2UTF8(s.codePointAt(0));
  }
  console.log(bs.slice(1));
  return new Uint8Array(bs.slice(1).split(',').map((item) => parseInt(item, 2))).buffer;
}

function codePoint2UTF8 (codePoint) {
  let codePoint2 = codePoint.toString(2);
  if (codePoint < 128) {
    return codePoint.toString(2);
  } else if (codePoint < 2048) {
    codePoint2 = ('00000000000000000' + codePoint2).slice(-11);
    const s1 =  '110' + codePoint2.substring(0, 5);
    const s2 =  '10' + codePoint2.substring(5);
    return `${s1},${s2}`;
  } else {
    codePoint2 = ('00000000000000000' + codePoint2).slice(-16);
    const s1 = '1110' + codePoint2.substring(0, 4);
    const s2 = '10' + codePoint2.substring(4, 10);
    const s3 = '10' + codePoint2.substring(10);
    return `${s1},${s2},${s3}`;
  }
}

const buffer = UTF8_Encoding('一a');
console.log(buffer);