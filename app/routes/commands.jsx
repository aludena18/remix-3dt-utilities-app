import { Container, Grid, Paper } from "@mui/material";
import SimpleForm from "../components/inputs/simpleForm";
import BoxResult from "../components/outputs/boxResult";
import { redirect } from "@remix-run/node";
import { getData, setData } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";
import { getCommandHex } from "../data/serverHelpers";
import BasicSelectMenu from "../components/menu/basicSelectMenu";

const textIntro = {
  content:
    "This utility will help to convert a string command to its hexadecimal version in order to be sent through the platform. For more information about the hexadecimal structure, visit each device website and search for the GPRS commands.",
};

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function CommandsRoute() {
  const data = useLoaderData();
  const [showResult, setShowResult] = useState(false);
  const [deviceId, setDeviceId] = useState(0);

  const handleSetCmd = function () {
    setShowResult(true);
  };

  const handleSetDeviceId = function (id) {
    setDeviceId(id);
  };

  return (
    <Container>
      <Introduction title="GPRS Commands" description={textIntro.content} />
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
            <BasicSelectMenu sx={{ pb: 2 }} setDeviceId={handleSetDeviceId} />
            <SimpleForm setCmd={handleSetCmd} device={deviceId} />
            <BoxResult
              sx={{ mt: 2 }}
              data={data[0].commandHex}
              show={showResult}
            />
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
  const device = formData.get("device");

  console.log(`Device:${device}, Command:${commandStr}`);

  let commandHex = getCommandHex(device, commandStr);
  console.log(commandHex);

  // Saving the command
  await setData(
    [{ device: device, commandStr: commandStr, commandHex: commandHex }],
    "textCmd.json"
  );

  // Redirect
  return redirect("/commands");
}

export async function loader() {
  const data = await getData("textCmd.json");
  return data;
}
