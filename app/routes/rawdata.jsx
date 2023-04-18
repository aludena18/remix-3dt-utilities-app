import { Grid, Paper } from "@mui/material";
import DropzoneComponent from "../components/dropzone/dropzoneComponent";
import SimpleForm from "../components/inputs/simpleForm";
import { redirect } from "@remix-run/node";

const textData = "";

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
          <DropzoneComponent />
          <SimpleForm />
        </Paper>
      </Grid>
    </Grid>
  );
}

export function action() {
  console.log("Message from the server");
  return redirect("/rawdata");
}
