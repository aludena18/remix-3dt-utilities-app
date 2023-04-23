import fs from "fs/promises";

export function setData(data) {
  const promise = fs.writeFile("text.json", JSON.stringify(data));
  return promise;
}

export async function getData() {
  try {
    const rawFileContent = await fs.readFile("text.json", { encoding: "utf8" });
    const data = JSON.parse(rawFileContent);
    return data;
  } catch (error) {
    console.log(error);
  }
}
