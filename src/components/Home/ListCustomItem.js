import PropTypes from "prop-types";
import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

export default function ListCustomItem(props) {
  const [underline, setUnderline] = useState(true);

  return (
    <ListItem button>
      <ListItemText>
        <TextField
          value={props.value}
          multiline
          fullWidth
          onChange={props.onChange}
          InputProps={{
            disableUnderline: underline,
            onFocus: () => {
              setUnderline(!underline);
            },
            onBlur: () => {
              setUnderline(!underline);
            }
          }}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={props.onClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ListCustomItem.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disableUnderline: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func
};
