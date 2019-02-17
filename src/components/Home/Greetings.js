import Paper from "@material-ui/core/Paper";
import { TextField } from "@material-ui/core";
import * as PropTypes from "prop-types";
import React from "react";
import BuildButton from "./buildButton";

export default function Greetings(props) {
  return (
    <Paper>
      <TextField
        value={props.value}
        multiline
        fullWidth
        onChange={props.onChange}
        variant="outlined"
      />
      <BuildButton onClick={props.onClick} />
    </Paper>
  );
}

Greetings.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};
