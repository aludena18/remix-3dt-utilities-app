export default function filterData(acceptedFiles) {
  console.log("a file has been drooped");
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    reader.readAsText(file);
  });
}
