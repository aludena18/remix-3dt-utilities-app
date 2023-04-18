export const textData = {
  content: "",
};

export default function filterData(acceptedFiles) {
  console.log("a file has been drooped");
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const file = reader.result;
      textData.content = file;
      console.log(textData);
      const allLines = file.split(/\r\n|\n/);
      // Reading line by line
      allLines.forEach((line) => {
        // console.log(line);
      });
    };
    reader.readAsText(file);
  });
  return textData;
}
