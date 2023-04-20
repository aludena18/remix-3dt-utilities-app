import { useSubmit } from "@remix-run/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Container, Typography, TextField } from "@mui/material";
import TextButton from "../inputs/textButton";

const tempFile = { name: "", content: "" };

export default function DropzoneForm(props) {
  const submit = useSubmit();
  // console.log(props.data);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("a file has been drooped");
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        tempFile.name = file.path;
        tempFile.content = reader.result;
        console.log(tempFile);
        submitForm();
      };
      reader.readAsText(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  let files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const submitForm = function (ev) {
    console.log("submitted");
    const formEl = document.getElementById("drop-form");
    // const formEl = ev.currentTarget.closest("form");

    // Set text content to the textarea element
    const inputHiddenEl = document.getElementById("file-name");
    const textareaEl = document.getElementById("file-content");
    inputHiddenEl.value = tempFile.name;
    textareaEl.value = tempFile.content;

    // Submitting the form
    submit(formEl, { replace: true });
  };

  const handleClick = function () {
    console.log(files);
    files.forEach((el) => {
      console.log(el);
    });
    props.handleClick();
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
        <TextButton buttonName="filter & save" onClick={handleClick} />
      </aside>
      <input id="file-name" type="hidden" name="name" />
      <textarea id="file-content" name="content" style={{ display: "none" }} />
    </form>
  );
}
