import * as React from "react";
import { Link } from "@remix-run/react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import WifiIcon from "@mui/icons-material/Wifi";
import CalculateIcon from "@mui/icons-material/Calculate";

const sections = [
  {
    link: "rawdata",
    headerTitle: " - Text Filter",
    sectionTitle: "Text Filter",
  },
  {
    link: "commands",
    headerTitle: " - Commands",
    sectionTitle: "Commands",
  },
  {
    link: "calculators",
    headerTitle: " - Calculators",
    sectionTitle: "Calculators",
  },
];

const linkStyle = {
  textDecoration: "inherit",
  color: "inherit",
};

export const mainListItems = function (handleTitle) {
  return (
    <React.Fragment>
      <Link style={linkStyle} to={sections[0].link}>
        <ListItemButton onClick={() => handleTitle(sections[0].headerTitle)}>
          <ListItemIcon>
            <TextSnippetIcon />
          </ListItemIcon>
          <ListItemText primary={sections[0].sectionTitle} />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to={sections[1].link}>
        <ListItemButton onClick={() => handleTitle(sections[1].headerTitle)}>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary={sections[1].sectionTitle} />
        </ListItemButton>
      </Link>
      <Link style={linkStyle} to={sections[2].link}>
        <ListItemButton onClick={() => handleTitle(sections[2].headerTitle)}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary={sections[2].sectionTitle} />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
