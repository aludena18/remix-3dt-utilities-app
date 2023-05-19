export const sections = {
  index: {
    title: "Intro",
    description:
      "This is an application with some utilities that you might find usefull for your daily routine at work at 3DTracking",
  },
  rawData: {
    title: "Raw Data Filter",
    description:
      "This utility will help you to filter a raw data file downloaded from FileZilla and have only the received messages, which are the messages sent by the device. Drag and drop a raw-data file into the box and press the button to download the file filtered.",
  },
  commands: {
    title: "GPRS Commands",
    description:
      "This utility will help you to convert a string command to its hexadecimal version in order to be sent through the platform. For more information about the hexadecimal structure, visit each device's website and search for the GPRS command.",
  },
};

export const tabTitle = "3DT Utilities";

// List fot the basicSelectMenu component
export const devicesList = ["Teltonika", "Ruptela"];
