import { Grid, Paper } from "@mui/material";
import { redirect } from "@remix-run/node";
import DropzoneForm from "../components/dropzone/dropzoneForm";
import { getText, setText } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function RawdataRoute() {
  const data = useLoaderData();

  const handleClick = function () {
    console.log("clicked");
    const blob = new Blob(["Example"], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "example.txt";
    link.href = fileUrl;
    link.click();
    URL.revokeObjectURL(link.href);
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
          <DropzoneForm data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export async function action({ request }) {
  console.log("Message from the server");
  const formData = await request.formData();

  // Filter the data
  const data = formData.get("content");
  console.log(data);

  // Reading line by line and filter them
  const allLines = data.split(/\r\n|\n/);
  const filteredData = allLines.map((line) => line.split(":")[1]);
  console.log(filteredData);
  await setText(filteredData[0]);

  // Redirect
  return redirect("/rawdata");
}

export async function loader() {
  const data = await getText();
  console.log("from loader", data);
  return data;
}
