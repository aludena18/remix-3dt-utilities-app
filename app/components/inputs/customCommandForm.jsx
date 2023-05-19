import { useSubmit } from "@remix-run/react";
import { Container, TextField } from "@mui/material";
import TextButton from "./textButton";
import { useState } from "react";
import BasicSelectMenu, { clearDevice } from "../menu/basicSelectMenu";

export default function CustomCommandForm(props) {
  const submit = useSubmit();
  const [input, setInput] = useState("");
  const [deviceId, setDeviceId] = useState(0);

  const handleSubmit = function (ev) {
    ev.preventDefault();
    submitForm(ev);
  };

  const submitForm = function (ev) {
    if (!input) return;
    console.log("submitted");

    // Copy the content to the hidden input
    const commandHiddenEl = document.getElementById("frm-command");
    commandHiddenEl.value = input;

    const deviceHiddenEl = document.getElementById("frm-device");
    deviceHiddenEl.value = deviceId;

    // Submit the form
    // const formEl = document.getElementById("tel-form");
    const formEl = ev.currentTarget.closest("form");
    submit(formEl, { replace: true });
    setInput("");
    clearDevice();
    props.setCmd();
  };

  const handleOnChange = function (ev) {
    setInput(ev.target.value);
  };

  const handleDeviceId = function (id) {
    setDeviceId(id);
  };

  return (
    <Container>
      <form id="cmd-form" method="post" onSubmit={handleSubmit}>
        <BasicSelectMenu
          sx={{ pb: 2, minWidth: 120 }}
          setDeviceId={handleDeviceId}
        />
        <TextField
          id="filled-basic"
          label="Command"
          variant="outlined"
          fullWidth
          sx={{ pb: 2 }}
          onChange={handleOnChange}
          value={input}
        />
        <input id="frm-device" type="hidden" name="device" />
        <input id="frm-command" type="hidden" name="command" />
        <TextButton buttonName="hex command" onClick={submitForm} />
      </form>
    </Container>
  );
}
