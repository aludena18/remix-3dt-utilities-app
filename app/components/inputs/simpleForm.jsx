import { useSubmit } from "@remix-run/react";
import { Container, TextField } from "@mui/material";
import TextButton from "./textButton";
import { useState } from "react";

export default function SimpleForm(props) {
  const submit = useSubmit();
  const [input, setInput] = useState("");

  const handleSubmit = function (ev) {
    ev.preventDefault();
    submitForm();
  };

  const submitForm = function () {
    if (!input) return;
    console.log("submitted");

    // Copy the content to the hidden input
    const inputHiddenEl = document.getElementById("cmd-data");
    inputHiddenEl.value = input;

    // Submit the form
    const formEl = document.getElementById("cmd-form");
    submit(formEl, { replace: true });
    setInput("");
    props.setCmd();
  };

  const handleOnChange = function (ev) {
    setInput(ev.target.value);
  };

  return (
    <Container>
      <form id="cmd-form" method="post" onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Command"
          variant="outlined"
          fullWidth
          sx={{ pb: 2 }}
          onChange={handleOnChange}
          value={input}
        />
        <input id="cmd-data" type="hidden" name="command" />
        <TextButton buttonName="hex command" onClick={submitForm} />
      </form>
    </Container>
  );
}
