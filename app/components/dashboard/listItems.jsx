import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary="Raw Data Filter" />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to="teltonika">
        <ListItemButton onClick={() => handleTitle(" - Teltonika")}>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary="Teltonika" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
