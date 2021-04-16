import { makeStyles, Theme } from "@material-ui/core";

export const useNavStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    color: "#242B5D",
    fontWeight: 700,
    fontSize: 20,
    marginTop: 16,
    marginLeft: -20,
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  navItem: {
    color: "#242B5D",
    fontWeight: 500,
    fontSize: 18,
    textTransform: "none",
  },
  tabsWrapper: {
    marginTop: 6,
  },
}));

export const useLinkStyles = makeStyles((theme: Theme) => ({
  link: {
    color: "#1976d2",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(2),
    cursor: "pointer",
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
