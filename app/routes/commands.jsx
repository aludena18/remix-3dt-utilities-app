import { Container, Grid, Paper } from "@mui/material";
import SimpleForm from "../components/inputs/customCommandForm";
import BoxResult from "../components/outputs/boxResult";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";
import { getCommandHex, getDeviceName } from "../data/serverHelpers";
import * as config from "../data/config.js";
import { getUser, setCommandToUser } from "../utils/db.server";

const USER_NAME = "aludena";

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
            <BoxResult
              sx={{ mt: 2 }}
              data={data.slice(-1)[0]}
              show={showResult}
            />
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
