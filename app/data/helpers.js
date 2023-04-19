import fs from "fs/promises";

export function setText(data) {
  dataArr = data;
}

export function getText() {
  return dataArr;
}
