import { Container, Grid, Paper } from "@mui/material";
import SimpleForm from "../components/inputs/simpleForm";
import BoxResult from "../components/outputs/boxResult";
import { redirect } from "@remix-run/node";
import { getCRC16, getData, numToFixedSizeArr, setData } from "../data/helpers";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Introduction from "../components/introduction/introduction";

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
            <SimpleForm setCmd={handleSetCmd} />
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
  const commandStr = formData.get("command");

  const command = [
    ...commandStr.split("").map((char) => char.charCodeAt(0).toString(16)),
    "0d",
    "0a",
  ];
  const preamble = ["00", "00", "00", "00"];
  const codecId = ["0c"];
  const cmdQ1 = ["01"];
  const type = ["05"];
  const cmdSize = numToFixedSizeArr(command.length, 4);
  const cmdQ2 = ["01"];
  const data = [
    ...codecId,
    ...cmdQ1,
    ...type,
    ...cmdSize,
    ...command,
    ...cmdQ2,
  ];
  const dataSize = numToFixedSizeArr(data.length, 4);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(getCRC16(dataBytes), 4);

  const commandMessage = [...preamble, ...dataSize, ...data, ...crc16]
    .map((char) => char.toUpperCase())
    .join(" ");

  // Saving the command
  await setData([{ cmdMsg: commandMessage }], "textCmd.json");

  // Redirect
  return redirect("/teltonika");
}

export async function loader() {
  const data = await getData("textCmd.json");
  return data;
}
