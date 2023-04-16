import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Container, Typography } from "@mui/material";
import filterData from "./filterData";

export default function DropzoneComponent(props) {
  const onDrop = useCallback((acceptedFiles) => {
    filterData(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const dropzoneStyle = {
    color: "gray",
    display: "flex",
    height: 80,
  };

  return (
    <Container className="container">
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
    </Container>
  );
}
