import { Container, Box, Typography } from "@mui/material";

export default function boxResult(props) {
  const result = function () {
    return <Typography variant="body2">{props.data}</Typography>;
  };

  return (
    <Container sx={props.sx}>
      <Box
        sx={{
          p: 2,
          border: "1px solid ",
          borderColor: "#bbb",
          borderRadius: 1,
          minHeight: 112,
        }}
      >
        {props.show && result()}
      </Box>
    </Container>
  );
}
