export const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  wrapper: {},
  paper: {
    textAlign: "right"
  },
  greetingsPaper: {
    marginTop: "5%",
    textAlign: "right",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});
