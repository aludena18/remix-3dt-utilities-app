import { Container, Grid, Paper } from "@mui/material";
import SimpleForm from "../components/inputs/simpleForm";
import BoxResult from "../components/outputs/boxResult";
import { redirect } from "@remix-run/node";
import { getCRC16, getData, numToFixedSizeArr, setData } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";
import { teltonikaCommand, ruptelaCommand } from "../data/serverHelpers";

const textIntro = {
  content:
    "This utility will help to convert a Teltonika string command to its hexadecimal version in order to be sent through the platform. For more information about the hexadecimal structure, visit de Teltonika's website and search for the codec 12",
};

export const meta = () => {
  return [{ title: "Remix 3DT App" }];
};

export default function TeltonikaRoute() {
  const data = useLoaderData();
  const [showResult, setShowResult] = useState(false);

  const handleSetCmd = function () {
    setShowResult(true);
  };

  return (
    <Container>
      <Introduction title="Teltonika" description={textIntro.content} />
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
              formId={"tel-form"}
              setCmd={handleSetCmd}
              typeCmd={"telCmd"}
              inputType={"teltonika-cmd"}
            />
            <SimpleForm
              formId={"rup-form"}
              setCmd={handleSetCmd}
              typeCmd={"rupCmd"}
              inputType={"ruptela-cmd"}
            />
            <BoxResult sx={{ mt: 2 }} data={data[0].cmdMsg} show={showResult} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Backend
export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);

  // check
  let commandMessage = "";
  let commandStr = formData.get("telCmd");
  if (commandStr) {
    // Teltonika Command
    console.log("Teltonika");
    console.log("Command:", commandStr);
    commandMessage = teltonikaCommand(commandStr);
  } else {
    console.log("Ruptela");
    commandStr = formData.get("rupCmd");
    console.log("Command:", commandStr);
    commandMessage = ruptelaCommand(commandStr);
  }

  // if (commandStr) {
  //   // Teltonika Command
  //   console.log("Teltonika");
  //   commandMessage = teltonikaCommand(commandStr);
  // } else {
  //   console.log("Ruptela");
  //   commandMessage = ruptelaCommand(commandStr);
  // }

  // Saving the command
  await setData([{ cmdMsg: commandMessage }], "textCmd.json");

  // Redirect
  return redirect("/teltonika");
}

export async function loader() {
  const data = await getData("textCmd.json");
  return data;
}
