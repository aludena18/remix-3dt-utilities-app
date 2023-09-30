export const sections = {
  index: {
    title: "Intro",
    description:
      "This is an application with some utilities that you might find useful. It contains a section to filter text files and a second section for generating commands in hexadecimal format for specific types of gps tracker devices.",
  },
  rawData: {
    title: "Text Filter",
    description:
      "This utility will help you to filter a text file by mapping all the lines in the file and only include those that match with the keyword defined in the filter box. You can also use the checkbox below to return the content after the keyword in each line.",
  },
  commands: {
    title: "Commands",
    description:
      "This utility will help you to convert a gps tracker device command to its hexadecimal format in order to be sent over GPRS. The devices supported are listed in the drop down menu. For more information about the hexadecimal structure, visit each device's website and search for the command section",
  },
};

export const tabTitle = "Utilities";

// List fot the basicSelectMenu component
export const devicesList = ["Teltonika", "Ruptela"];
