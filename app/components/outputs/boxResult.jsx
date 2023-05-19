import { Container, Box, Typography } from "@mui/material";

export default function boxResult(props) {
  const result = function () {
    return (
      <Box>
        <Typography variant="body2">Last request: {props.data.date}</Typography>
        <Typography variant="body2">Device: {props.data.device}</Typography>
        <Typography variant="body2">Comand: {props.data.commandStr}</Typography>
        <Typography variant="body2">
          Comand Hex: {props.data.commandHex}
        </Typography>
      </Box>
    );
  };

  return (
    <Container sx={props.sx}>
      <Box
        sx={{
          p: 2,
          border: "1px solid ",
          borderColor: "#bbb",
          borderRadius: 1,
          minHeight: 120,
        }}
      >
        {result()}
      </Box>
    </Container>
  );
}
