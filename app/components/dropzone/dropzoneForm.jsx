import { useSubmit } from "@remix-run/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Container, Typography, TextField } from "@mui/material";
import TextButton from "../inputs/textButton";

export default function DropzoneForm(props) {
  const [renderFiles, setRenderFiles] = useState(false);
  const submit = useSubmit();

  const onDrop = useCallback((acceptedFiles) => {
    console.log("a file has been drooped");
    console.log(acceptedFiles);
    const filesData = [];
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const fileData = {};
        fileData.name = file.path;
        fileData.content = reader.result;
        filesData.push(fileData);
      };
      reader.onloadend = () => {
        if (filesData.length !== acceptedFiles.length) return;
        console.log("finish reading files", filesData);
        const filesDataStr = JSON.stringify(filesData);
        submitForm(filesDataStr);
      };
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  let files = acceptedFiles.map((file) => (
    <li key={file.path} id={file.path}>
      {/* {file.path} - {file.size} bytes */}
      {file.path}
    </li>
  ));

  const submitForm = function (data) {
    console.log("submitted");
    setRenderFiles(true);
    props.handleSubmit();
    const formEl = document.getElementById("drop-form");
    // const formEl = ev.currentTarget.closest("form");

    // Set text content to the textarea element
    const inputHiddenEl = document.getElementById("files-data");
    inputHiddenEl.value = data;

    // Submitting the form
    submit(formEl, { replace: true });
  };

  const handleClick = function () {
    setRenderFiles(false);
    props.handleClick();
  };

  const dropzoneStyle = {
    color: "gray",
    display: "flex",
    height: 100,
  };

  return (
    <Container>
      <form id="drop-form" method="post">
        <Box sx={{ border: "1px dashed gray", borderRadius: 1 }}>
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
          <Typography sx={{ pt: 2 }} variant="body2">
            Files
          </Typography>
          <ul>
            <Typography variant="body2">{renderFiles && files}</Typography>
          </ul>
        </aside>
        <input id="files-data" type="hidden" name="files" />
        <TextButton
          align="center"
          buttonName="filter & save"
          onClick={handleClick}
        />
      </form>
    </Container>
  );
}
