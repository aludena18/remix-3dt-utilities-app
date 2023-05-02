import { numToFixedSizeArr, getCRC16 } from "./helpers";

// Teltonika Command
export const teltonikaCommand = function (commandStr) {
  const command = [
    ...commandStr.split("").map((char) => char.charCodeAt(0).toString(16)),
    "0d",
    "0a",
  ];
  const preamble = ["00", "00", "00", "00"];
  const codecId = ["0c"];
  const cmdQ1 = ["01"];
  const type = ["05"];
  const cmdSize = numToFixedSizeArr(command.length, 4);
  const cmdQ2 = ["01"];
  const data = [
    ...codecId,
    ...cmdQ1,
    ...type,
    ...cmdSize,
    ...command,
    ...cmdQ2,
  ];
  const dataSize = numToFixedSizeArr(data.length, 4);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(getCRC16(dataBytes), 4);

  const commandMessage = [...preamble, ...dataSize, ...data, ...crc16]
    .map((char) => char.toUpperCase())
    .join(" ");
  return commandMessage;
};

// Ruptela command
export const ruptelaCommand = function (commandStr) {
  const commandID = ["6c"];
  const payload = commandStr
    .split("")
    .map((char) => char.charCodeAt(0).toString(16));
  const data = [...commandID, ...payload];
  const packetLength = numToFixedSizeArr(data, 2);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(getCRC16(dataBytes), 2);

  console.log("CRC16 -----> ", crc16);

  return "something";
};
