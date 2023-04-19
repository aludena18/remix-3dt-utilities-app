import { Grid, Paper } from "@mui/material";
import { redirect } from "@remix-run/node";
import DropzoneForm from "../components/dropzone/dropzoneForm";
import { setData, getData } from "../data/helpers";

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function RawdataRoute() {
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
          <DropzoneForm />
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
  setData(filteredData);

  // Redirect
  return redirect("/rawdata");
}

export function loader() {
  console.log("from loader", getData());
  return null;
}
