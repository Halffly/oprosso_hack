import {
  InputBase,
  TextField,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { theme } from "../../consts/theme";

export const FilledTextInput = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: "#EFEFEF",
      minHeight: 57,
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: "120%",
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 14,
      paddingBottom: 14,
      color: "#000",
    },
    "& .MuiInputLabel-filled": {
      fontSize: 18,
      marginLeft: 0,
      position: "relative",
      fontWeight: 600,
      marginBottom: 13,
      color: "#000",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "none",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#000",
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
    },
  },
  // "& "
})(TextField);

export const FilledTextInputBase = withStyles(
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
        fontSize: 18,
        marginLeft: 0,
        position: "relative",
        fontWeight: 600,
        marginBottom: 13,
        color: "#000",
      },
      "& .MuiFormLabel-root": {
        marginTop: theme.spacing(3),
        fontSize: 18,
        marginLeft: 0,
        position: "relative",
        fontWeight: 600,
        marginBottom: 13,
        color: "#000",
      },
    },
    input: {
      borderRadius: 12,
      backgroundColor: "#EFEFEF",
      minHeight: 57,

      fontWeight: 500,
      fontSize: 18,
      lineHeight: "120%",
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 14,
      paddingBottom: 14,
      color: "#000",
      "&:focus": {
        borderRadius: 12,
      },
    },
  })
)(InputBase);
