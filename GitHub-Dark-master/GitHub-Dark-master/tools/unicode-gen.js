#!/usr/bin/env node
"use strict";

const chars = "©®™▪◼◾♠♣✔✖〰";
const emojis = "➕➖➗➰⬛◾🎶🎼💱💲🔃🔙🔚🔛🔜🔝🎵➿🐾🐾";

function padStart(num) {
  const str = "" + num, pad = "00000";
  return pad.substring(0, pad.length - str.length) + str;
}

function getExcludeRanges(chars) {
  const codes = Array.from(chars).map(char => char.codePointAt(0));
  const ranges = codes.map((code, i, codes) => {
    return [code + 1, (i < codes.length - 1) ? codes[i + 1] - 1 : 0x10FFFF];
  });
  ranges.unshift([0, codes[0] - 1]);
  return ranges;
}

function cssString(ranges) {
  let str = "";
  ranges.forEach(range => {
    str += "U+";
    str += padStart(range[0].toString(16).toUpperCase(), 5, "0");
    str += "-";
    str += padStart(range[1].toString(16).toUpperCase(), 5, "0");
    str += ",";
  });
  return str.slice(0, -1);
}

console.log(cssString(getExcludeRanges(chars)) + "\n");
console.log(Array.from(emojis).map(char => {
  const hex = char.codePointAt(0).toString(16);
  return 'g-emoji[fallback-src$="' + hex + '.png"]';
}).join(", "));
