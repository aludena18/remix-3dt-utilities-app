import { Container, Grid, Paper } from "@mui/material";
import { redirect } from "@remix-run/node";
import DropzoneForm from "../components/dropzone/dropzoneForm";
import { setData, getData } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";

const textIntro = {
  content: "This utility will help to filter a raw data file.",
};

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function RawdataRoute() {
  const data = useLoaderData();
  const [submitted, setSubmitted] = useState(false);

  const saveFile = function () {
    if (!submitted) return;
    setSubmitted(false);
    console.log(data);

    //Saving files
    data.forEach((file) => {
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

  const handleSubmit = function () {
    setSubmitted(true);
  };

  return (
    <Container>
      <Introduction title="Raw Data Filter" description={textIntro.content} />
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
            <DropzoneForm handleClick={saveFile} handleSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

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
