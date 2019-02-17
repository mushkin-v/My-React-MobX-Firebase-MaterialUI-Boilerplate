import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { ListCustomItem } from "./ListCustomItem";

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
  return (
    <div className={classes.root}>
      <List component="nav">
        {phrases.map(function(item, phraseNumber) {
          return (
            <ListCustomItem
              key={phraseNumber}
              value={item}
              onChange={e => onPhraseClick(columnId, phraseNumber, e)}
              onClick={e => onPhraseDeleteClick(columnId, phraseNumber, e)}
            />
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
