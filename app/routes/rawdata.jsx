import { Grid, Paper } from "@mui/material";
import DropzoneComponent from "../components/dropzone/dropzoneComponent";

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function RawdataRoute() {
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
        </Paper>
      </Grid>
    </Grid>
  );
}
