function longestPalindromicSubstring(str) {
  const modifiedStr = '#' + str.split('').join('#') + '#';
  const n = modifiedStr.length;
  const p = new Array(n).fill(0);
  let center = 0,
    right = 0;

  for (let i = 1; i < n - 1; i++) {
    if (i < right) {
      p[i] = Math.min(right - i, p[2 * center - i]);
    }
    while (modifiedStr[i + p[i] + 1] === modifiedStr[i - p[i] - 1]) {
      p[i]++;
    }
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  const maxLen = Math.max(...p);
  const centerIndex = p.indexOf(maxLen);
  const start = (centerIndex - maxLen) / 2;
  const end = start + maxLen;

  return str.substring(start, end);
}

function LPS(text: string) {
  const modifiedText = '#' + text.split('').join('#') + '#';
  const palindromeRad = new Array(modifiedText.length).fill(0);
  let center = 0,
    radius = 0;
  while (center < modifiedText.length) {
    while (
      center - (radius + 1) >= 0 &&
      center + (radius + 1) < modifiedText.length &&
      modifiedText[center - (radius + 1)] ===
        modifiedText[center + (radius + 1)]
    ) {
      radius = radius + 1;
    }

    palindromeRad[center] = radius;

    let prevCenter = center;
    let prevRadius = radius;
    center = center + 1;
    radius = 0;
    while (center < prevCenter + prevRadius) {
      const mirroredCenter = prevCenter - (center - prevCenter);
      const maxMirroredRadius = prevCenter + prevRadius - center;
      if (palindromeRad[mirroredCenter] < maxMirroredRadius) {
        palindromeRad[center] = palindromeRad[mirroredCenter];
        center = center + 1;
      } else {
        radius = maxMirroredRadius;
        break;
      }
    }
  }

  const maxRadius = Math.max(...palindromeRad);
  const centerIdx = palindromeRad.indexOf(maxRadius);
  const start = (centerIdx - maxRadius) / 2;
  const end = start + maxRadius;
  return text.slice(start, end);
}

console.log(longestPalindromicSubstring('abbbaabbabbabb'));
console.log(LPS('abbbaabbabbabb'));
