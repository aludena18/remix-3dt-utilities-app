import fs from "fs/promises";

export function setText(text) {
  const promise = fs.writeFile("text.json", JSON.stringify({ content: text }));
  return promise;
}

export async function getText() {
  try {
    const rawFileContent = await fs.readFile("text.json", { encoding: "utf8" });
    const data = JSON.parse(rawFileContent);
    return data;
  } catch (error) {
    console.log(error);
  }
}
