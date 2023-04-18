import { Button, Container } from "@mui/material";

export default function TextButton(props) {
  return (
    <Container>
      <Button
        variant="contained"
        onClick={props.onClick}
        onSubmit={props.onSubmit}
      >
        {props.buttonName}
      </Button>
    </Container>
  );
}
