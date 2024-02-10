export const sections = {
  index: {
    title: "Intro",
    description:
      "This is an application with some utilities that you might find useful. It contains a section to filter text files and a second section for generating commands in hexadecimal format for specific types of gps tracker devices.",
  },
  rawData: {
    title: "Text Filter",
    description:
      "This utility will help you to filter a text file by mapping all the lines in the file and only include those that match with the keyword. You can also use the checkbox below to return the content after the keyword in each line.",
  },
  commands: {
    title: "Commands",
    description:
      "This utility will help you to convert a gps tracker device command to its hexadecimal format in order to be sent over GPRS. The devices supported are listed in the drop down menu. For more information about the hexadecimal structure, visit each device's website and search for the command section",
  },
  calculators: {
    title: "Calculators",
    description:
      "This utility is meant to calculate the CRC (cyclic redundancy check) from a hexadecimal data string. There is a list of calculators depending on the algorithm needed. Please introduce the hexadecimal data string including one space between the bytes. \nExample: E0 94 5D 09 DC 05 03 00 DA 0A 53",
  },
};

export const tabTitle = "Utilities";

// List of devices fot the basicSelectMenu component
export const devicesList = ["Teltonika", "Ruptela", "Concox"];

// List of calculators fot the basicSelectMenu component
export const calculatorsList = [
  "Fletcher 16 (Digital Matter)",
  "CRC 16 CCITT",
  "CRC 16 IBM",
  "CRC 16 X25",
];
