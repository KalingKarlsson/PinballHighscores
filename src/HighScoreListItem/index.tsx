import * as React from "react";
import {ListItem, ListItemText } from "@mui/material";

interface IHighscoresList {
  rank: number;
  name: string;
  score: string;
}

const HighscoreListItem: React.FC<IHighscoresList> = ({ rank, name, score }) => {
  return (
      <ListItem key={score} style={{ width: 350, borderStyle: "solid", margin: 8}}>
        <ListItemText primary={rank} />
        <ListItemText primary={name} />
        <ListItemText primary={score} />
      </ListItem>
  );
};

export default HighscoreListItem;
