import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";

export default function BasicSelectMenu(props) {
  const [device, setDevice] = React.useState("");

  const handleChange = (event) => {
    setDevice(event.target.value);
    props.setDeviceId(event.target.value);
  };

  return (
    <Container sx={props.sx}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Device</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={device}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={1}>Teltonika</MenuItem>
            <MenuItem value={2}>Ruptela</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}
