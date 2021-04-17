import { Button, withStyles } from "@material-ui/core";
import { theme } from "../consts/theme";

export const RoundedButton = withStyles({
  root: {
    borderRadius: 24,
    textTransform: "none",
    paddingLeft: 18,
    paddingRight: 18,
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  
})(Button);
