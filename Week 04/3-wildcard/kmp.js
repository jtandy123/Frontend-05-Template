function kmp(source, pattern) {
  let table = new Array(pattern.length).fill(0);

  {
    let i = 1; j = 0;
    while (i < pattern.length - 1) {
      if (pattern[i] === pattern[j] || pattern[i] === '?' || pattern[j] === '?') {
        ++j;
        ++i;
        table[i] = j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          ++i;
        }
      }
    }
  }

  {
    let i = 0; j = 0;
    while(i < source.length) {
      if (pattern[j] === source[i] || pattern[j] === '?') {
        ++i;
        ++j;
      } else {
        if (j > 0) {
          j = table[j];
          while (pattern[j] === '?') {
            j = table[j];
          }
        } else {
          ++i;
        }
      }
      if (j === pattern.length) {
        return i - j;
      }
    }
    return -1;
  }
}