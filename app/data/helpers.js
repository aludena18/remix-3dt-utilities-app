import fs from "fs/promises";

export function setData(data, file) {
  const promise = fs.writeFile(file, JSON.stringify(data));
  return promise;
}

export async function getData(file) {
  try {
    const rawFileContent = await fs.readFile(file, { encoding: "utf8" });
    const data = JSON.parse(rawFileContent);
    return data;
  } catch (error) {
    console.log(error);
  }
}

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
