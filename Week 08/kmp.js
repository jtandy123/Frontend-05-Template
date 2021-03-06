function genPMT(pattern) {
  let table = Array(pattern.length).fill(0);
  let i = 1;
  let j = 0;
  while(i < pattern.length - 1) {
    if (pattern[i] === pattern[j]) {
      table[++i] = ++j;
    } else {
      if (j > 0) {
        j = table[j];
      } else {
        i++;
      }
    }
  }
  return table;
}

console.log(genPMT('aabaaaca'));

function genStateFunc(pattern) {
  if (pattern.length === 0) {
    return false;
  }

  const funcTable = Array(pattern.length);
  const kmpTable = genPMT(pattern);
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    funcTable[i] = function(w) {
      if (w === c) {
        return i === pattern.length - 1 ? end : funcTable[i + 1];
      } else {
        if (i === 0) {
          return funcTable[0];
        }
        if (kmpTable[i]) {
          return funcTable[kmpTable[i]](w);
        }
        return funcTable[0](w);
      }
    }
  }
  return funcTable;
}

function end() {
  return end;
}

function match(str, pattern) {
  const funcTable = genStateFunc(pattern);
  if (!funcTable) return false;
  let state = funcTable[0];
  for (let c of str) {
    state = state(c);
  }
  return state === end;
}