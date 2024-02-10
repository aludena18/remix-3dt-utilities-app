import { Container, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as config from "../data/config.js";
import SimpleForm from "../components/inputs/customCommandForm";
import BoxResult from "../components/outputs/boxResult";
import Introduction from "../components/introduction/introduction";
import { getCommandHex, getDeviceName } from "../data/serverHelpers";
import { getUser, setCommandToUser } from "../utils/db.server";

const USER_NAME = "aludena";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function CommandsRoute() {
  const data = useLoaderData();
  const lastReq = data.slice(-1)[0];
  const dataToShow = [
    { label: "Last Request", value: lastReq.date },
    { label: "Device", value: lastReq.device },
    { label: "Command", value: lastReq.command },
    { label: "Command (Hex)", value: lastReq.hexCommand },
  ];
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
            <SimpleForm
              setCmd={handleSetCmd}
              setDropDownLabel={"Device"}
              setDropDownList={config.devicesList}
              setInputLabel={"Command"}
              setButtonLabel={"try it out"}
            />
            <BoxResult sx={{ mt: 2 }} data={dataToShow} show={showResult} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Backend functions ---------------------------

// Action
export async function action({ request }) {
  const formData = await request.formData();
  const commandStr = formData.get("command");
  const deviceId = formData.get("device");
  const commandHex = getCommandHex(deviceId, commandStr);

  const command = {
    date: new Date().toString(),
    device: getDeviceName(+deviceId),
    command: commandStr,
    hexCommand: commandHex,
  };
  await setCommandToUser(USER_NAME, command);

  return redirect("/commands");
}

// Loader
export async function loader() {
  const user = await getUser(USER_NAME);
  const data = user.commands;
  return data;
}
