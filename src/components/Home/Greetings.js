import { TextField } from "@material-ui/core";
import * as PropTypes from "prop-types";
import React from "react";
import BuildButton from "./buildButton";
import CopyButton from "./CopyButton";

export default function Greetings(props) {
  return (
    <React.Fragment>
      <br />
      <TextField
        value={props.value}
        multiline
        fullWidth
        onChange={props.onChange}
        // variant="filled"
      />
      <br />
      <br />
      <CopyButton onClick={props.onCopyClick} />
      <BuildButton onClick={props.onBuildClick} />
    </React.Fragment>
  );
}

Greetings.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};
