import { useSubmit } from "@remix-run/react";
import { Container, TextField } from "@mui/material";
import TextButton from "./textButton";
import { useState } from "react";

export default function SimpleForm(props) {
  const submit = useSubmit();
  const [input, setInput] = useState("");

  const handleSubmit = function (ev) {
    ev.preventDefault();
    submitForm(ev);
  };

  const submitForm = function (ev) {
    if (!input) return;
    console.log("submitted");

    // Copy the content to the hidden input
    const elementID = props.inputType;
    const inputHiddenEl = document.getElementById(elementID);
    inputHiddenEl.value = input;

    // Submit the form
    // const formEl = document.getElementById("tel-form");
    const formEl = ev.currentTarget.closest("form");
    submit(formEl, { replace: true });
    setInput("");
    props.setCmd();
  };

  const handleOnChange = function (ev) {
    setInput(ev.target.value);
  };

  return (
    <Container>
      <form id={props.formId} method="post" onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Command"
          variant="outlined"
          fullWidth
          sx={{ pb: 2 }}
          onChange={handleOnChange}
          value={input}
        />
        <input id={props.inputType} type="hidden" name={props.typeCmd} />
        <TextButton buttonName="hex command" onClick={submitForm} />
      </form>
    </Container>
  );
}
