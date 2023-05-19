import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import WifiIcon from "@mui/icons-material/Wifi";
import { Link } from "@remix-run/react";

const linkStyle = {
  textDecoration: "inherit",
  color: "inherit",
};

export const mainListItems = function (handleTitle) {
  return (
    <React.Fragment>
      <Link style={linkStyle} to="rawdata">
        <ListItemButton onClick={() => handleTitle(" - Raw Data Filter")}>
          <ListItemIcon>
            <TextSnippetIcon />
          </ListItemIcon>
          <ListItemText primary="Raw Data Filter" />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to="commands">
        <ListItemButton onClick={() => handleTitle(" - Commands")}>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Commands" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
