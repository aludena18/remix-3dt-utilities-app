import { Container, Grid, Paper } from "@mui/material";
import { redirect } from "@remix-run/node";
import DropzoneForm from "../components/dropzone/dropzoneForm";
import { setData, getData } from "../data/serverHelpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";
import * as config from "../data/config.js";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function RawdataRoute() {
  // const data = "";
  const [dataFiltered, setDataFiltered] = useState([]);
  const [readyToSave, setreadyToSave] = useState(false);

  const saveFile = function () {
    if (!readyToSave) return;
    setreadyToSave(false);
    console.log(dataFiltered);

    //Saving files
    dataFiltered.forEach((file) => {
      const blob = new Blob([file.content], {
        type: "text/plain;charset=utf-8",
      });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `rawData_${file.name}`;
      link.href = fileUrl;
      link.click();
      URL.revokeObjectURL(link.href);
      console.log("File Saved");
    });
  };

  const handleReadyToSave = function () {
    setreadyToSave(true);
  };

  const handleSetDataFiltered = function (data) {
    setDataFiltered(data);
  };

  return (
    <Container>
      <Introduction
        title={config.sections.rawData.title}
        description={config.sections.rawData.description}
      />
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: 280,
            }}
          >
            <DropzoneForm
              handleClick={saveFile}
              handleReadyToSave={handleReadyToSave}
              handleSetDataFiltered={handleSetDataFiltered}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

/*
export async function action({ request }) {
  const formData = await request.formData();

  // Filtering the data
  const filesDataStr = formData.get("files");
  const filesData = JSON.parse(filesDataStr);
  const filesDataFiltered = filesData.map((fileData) => {
    const contentFiltered = fileData.content
      .split(/\r\n|\n/)
      .filter((frame) => frame.includes("Rec"))
      .map((line) => line.split(">")[1])
      .join("\r\n");
    return { name: fileData.name, content: contentFiltered };
  });
  console.log(filesDataFiltered.length, " files filtered");

  // Saving the data filtered
  await setData(filesDataFiltered, "text.json");

  // Redirect
  return redirect("/rawdata");
}

export async function loader() {
  const data = await getData("text.json");
  return data;
}
*/
