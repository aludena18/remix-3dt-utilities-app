import { Grid, Paper } from "@mui/material";
import { redirect } from "@remix-run/node";
import DropzoneForm from "../components/dropzone/dropzoneForm";
import { getText, setText } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function RawdataRoute() {
  const data = useLoaderData();
  const [submitted, setSubmitted] = useState(false);

  const saveFile = function () {
    if (!submitted) return;
    setSubmitted(false);
    const blob = new Blob([data.content], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `rawData_${data.name}`;
    link.href = fileUrl;
    link.click();
    URL.revokeObjectURL(link.href);
    console.log("File Saved");
  };

  const handleSubmit = function () {
    setSubmitted(true);
  };

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 250,
          }}
        >
          <DropzoneForm handleClick={saveFile} handleSubmit={handleSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  // Filter the data
  const name = formData.get("name");
  const content = formData.get("content");
  const allLines = content.split(/\r\n|\n/);
  const filteredContent = allLines
    .filter((frame) => frame.includes("Rec"))
    .map((line) => line.split(">")[1]);
  console.log("Backend - ", "Data filtered");

  // Saving the filtered data into a temp file
  await setText(name, filteredContent.join("\r\n"));

  // Redirect
  return redirect("/rawdata");
}

export async function loader() {
  const data = await getText();
  return data;
}
