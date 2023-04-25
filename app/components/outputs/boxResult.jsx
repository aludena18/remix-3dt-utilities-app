import { Container, Box } from "@mui/material";

export default function boxResult(props) {
  return (
    <Container sx={props.sx}>
      <Box
        sx={{ p: 2, border: "1px solid gray", borderRadius: 1, height: 100 }}
      >
        {props.data}
      </Box>
    </Container>
  );
}
