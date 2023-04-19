import { useSubmit } from "@remix-run/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Container, Typography, TextField } from "@mui/material";
import TextButton from "../inputs/textButton";

const textData = { content: "" };

export default function DropzoneForm(props) {
  const submit = useSubmit();
  const onDrop = useCallback((acceptedFiles) => {
    console.log("a file has been drooped");
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const file = reader.result;
        textData.content = file;
        console.log(textData);
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
          // console.log(line);
        });
      };
      reader.readAsText(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const submitForm = function (ev) {
    console.log("submitted");
    const formEl = document.getElementById("drop-form");
    // const formEl = ev.currentTarget.closest("form");

    // Create textarea element & append it to the form
    const textareaEl = document.createElement("textarea");
    textareaEl.name = "content";
    textareaEl.value = textData.content;
    formEl.append(textareaEl);

    // Submitting the form
    submit(formEl, { replace: true });
  };

  const dropzoneStyle = {
    color: "gray",
    display: "flex",
    height: 80,
  };

  return (
    <form id="drop-form" method="post">
      <Box sx={{ border: "2px dashed gray" }}>
        <div style={dropzoneStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography
            style={{ margin: "auto" }}
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
          >
            Drag 'n' drop some files here, or click to select files
          </Typography>
        </div>
      </Box>
      <aside>
        <Typography sx={{ pt: 2 }} variant="h6">
          Files
        </Typography>
        <ul>{files}</ul>
      </aside>
      <aside>
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextButton buttonName="filter & save" onClick={submitForm} />
      </aside>
    </form>
  );
}
