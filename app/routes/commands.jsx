import { Container, Grid, Paper } from "@mui/material";
import SimpleForm from "../components/inputs/customCommandForm";
import BoxResult from "../components/outputs/boxResult";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";
import {
  getCommandHex,
  getData,
  setData,
  getDeviceName,
} from "../data/serverHelpers";
import * as config from "../data/config.js";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function CommandsRoute() {
  const data = useLoaderData();
  const [showResult, setShowResult] = useState(false);

  const handleSetCmd = function () {
    setShowResult(true);
  };

  return (
    <Container>
      <Introduction
        title={config.sections.commands.title}
        description={config.sections.commands.description}
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
            <SimpleForm setCmd={handleSetCmd} />
            <BoxResult sx={{ mt: 2 }} data={data[0]} show={showResult} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Backend
export async function action({ request }) {
  const formData = await request.formData();
  const commandStr = formData.get("command");
  const deviceId = formData.get("device");
  const commandHex = getCommandHex(deviceId, commandStr);

  // Saving the command
  await setData(
    [
      {
        date: new Date().toString(),
        device: getDeviceName(+deviceId),
        commandStr: commandStr,
        commandHex: commandHex,
      },
    ],
    "textCmd.json"
  );

  // Redirect
  return redirect("/commands");
}

export async function loader() {
  const data = await getData("textCmd.json");
  return data;
}
