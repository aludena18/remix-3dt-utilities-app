// Returns a fixed size array of string hex bytes from a number
export function numToFixedSizeArr(val, arrNumBytes) {
  const hexArr = [];
  const numHexStr = val.toString(16);
  const tempArr =
    numHexStr.length % 2 === 1
      ? ["0", ...numHexStr.split("")]
      : [...numHexStr.split("")];

  const tempArrLen = tempArr.length;
  for (let i = 0; i < tempArrLen / 2; i++) {
    hexArr.push(tempArr.splice(0, 2).join(""));
  }

  const hexArrLen = hexArr.length;
  for (let i = 0; i < arrNumBytes - hexArrLen; i++) {
    hexArr.unshift("00");
  }
  return hexArr;
}

// Retunr CRC 16 IBM - https://www.lddgo.net/en/encrypt/crc
export function getCRC16(buffer) {
  // let crc = 0xffff;
  let crc = 0x0000;
  let odd;

  for (let i = 0; i < buffer.length; i++) {
    crc = crc ^ buffer[i];

    for (let j = 0; j < 8; j++) {
      odd = crc & 0x0001;
      crc = crc >> 1;
      if (odd) {
        crc = crc ^ 0xa001;
      }
    }
  }

  return crc;
}

// Return CRC 16 CCITT - https://www.lddgo.net/en/encrypt/crc
export const crc16ccitt = (regInit, message) => {
  if (typeof message === "undefined") {
    message = regInit;
    regInit = 0x0000;
  }

  if (typeof message === "string") {
    message = message.split("").map((c) => c.charCodeAt(0));
    console.log(message);
  }

  // Binary input reverse
  const binArrInput = message.map((num) => mirror_nbits(8, num));
  const input = binArrInput;

  let crc = regInit + 0;
  const polynomial = 0x1021;

  for (const b of input) {
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  crc &= 0xffff;

  // Binary output reverse
  const output = mirror_nbits(16, crc);

  return output;
};

// Return a number where the bits have been reversed
function mirror_nbits(digits, n) {
  let t = n.toString(2).split("");
  let str_len = t.length;
  for (let i = 0; i < digits - str_len; i++) {
    t.unshift("0");
  }
  return parseInt(t.reverse().join(""), 2);
}
