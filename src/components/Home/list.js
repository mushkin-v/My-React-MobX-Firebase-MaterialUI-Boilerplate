import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

function SimpleList(props) {
  const {
    classes,
    phrases,
    onPhraseClick,
    onPhraseDeleteClick,
    columnId
  } = props;

  const [underline, setUnderline] = useState(true);

  return (
    <div className={classes.root}>
      <List component="nav">
        {phrases.map(function(item, phraseNumber) {
          let currentUnderline = underline;
          return (
            <ListItem key={phraseNumber} button>
              <ListItemText>
                <TextField
                  value={item}
                  multiline
                  fullWidth
                  onChange={e => onPhraseClick(columnId, phraseNumber, e)}
                  InputProps={{
                    disableUnderline: currentUnderline,
                    onBlur: () => {
                      console.log(currentUnderline);
                      currentUnderline = !currentUnderline;
                    }
                  }}
                />
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={e => onPhraseDeleteClick(columnId, phraseNumber, e)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
