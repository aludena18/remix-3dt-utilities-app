import { numToFixedSizeArr, getCRC16, crc16ccitt } from "./helpers";
import fs from "fs/promises";
import { devicesList } from "./config";

// Set data into a temporary file
export function setData(data, file) {
  const promise = fs.writeFile(file, JSON.stringify(data));
  return promise;
}

// Get data from the temporaty file
export async function getData(file) {
  try {
    const rawFileContent = await fs.readFile(file, { encoding: "utf8" });
    const data = JSON.parse(rawFileContent);
    return data;
  } catch (error) {
    console.log(error);
  }
}

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
  const packetLength = numToFixedSizeArr(data.length, 2);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(crc16ccitt(dataBytes), 2);

  const commandMessage = [...packetLength, ...data, ...crc16]
    .map((char) => char.toUpperCase())
    .join(" ");

  return commandMessage;
};

// Get command
export const getCommandHex = function (device, commandStr) {
  switch (+device) {
    case 0:
      console.log("Teltonika");
      return teltonikaCommand(commandStr);
    case 1:
      console.log("Ruptela");
      return ruptelaCommand(commandStr);

    default:
      return "";
  }
};

// Get device Name
export const getDeviceName = function (id) {
  return devicesList[id];
};
