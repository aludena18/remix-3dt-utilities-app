import { Container, TextField } from "@mui/material";
import TextButton from "./textButton";
import { useSubmit } from "@remix-run/react";

export default function SimpleForm(props) {
  const submit = useSubmit();

  const submitForm = function (ev) {
    console.log("submitted");
    const formEl = ev.currentTarget.closest("form");
    console.log(props.data);
    console.log(formEl);
    submit(formEl);
  };

  return (
    <Container>
      <form method="post">
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextButton buttonName="filter & sa" onClick={submitForm} />
      </form>
    </Container>
  );
}
