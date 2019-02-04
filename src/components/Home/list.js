import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

function SimpleList(props) {
  const { classes, phrases, onPhraseClick, onPhraseDeleteClick } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {phrases.map(function(item, i) {
          return (
            <ListItem key={i} button onClick={e => onPhraseClick(i, e)}>
              <ListItemText primary={item} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={e => onPhraseDeleteClick(i, e)}
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
