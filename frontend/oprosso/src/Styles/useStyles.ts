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

export const useCardStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: "relative",
    height: 333,
    width: "100%",
    borderRadius: 24,
    cursor: "pointer",
    backgroundSize: "cover !important",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 24,
      left: 0,
      top: 0,
      background:
        "linear-gradient(0.27deg, #000000 -14.83%, rgba(0, 0, 0, 0) 99.83%)",
    },
  },
  mainTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 600,
  },
  subitle: {
    color: "#FFF",
    fontWeight: 500,
    fontSize: 14,
  },
  contentWrapper: {
    position: "absolute",
    bottom: 33,
    left: 18,
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    width: "92%",
  },
  rateText: {
    color: "#FFF",
    fontWeight: 600,
    fontSize: 14,
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

export const useAnalyticsPageStyles = makeStyles((theme: Theme) => ({
  headline: { fontWeight: "bold", fontSize: 24, marginBottom: -10 },
}));

export const useDropZoneStyles = makeStyles((theme: Theme) => ({
  previewLogoContainer: {
    margin: "0 !important",
    justifyContent: "center",
    position: "relative",
    width: "100% !important",
    backgroundColor: "#EFEFEF",
  },
  previewItemContainer: {
    // marginTop: '10px !important',
    // padding: '8px !important',
    // backgroundColor: "#EFEFEF",
  },
  dropZoneRoot: {
    backgroundColor: "#EFEFEF",
    borderRadius: 18,
  },
  dropZoneLogo: {
    // backgroundColor: "#EFEFEF",
  },
  dropZoneLogoIcon: {
    opacity: 0,
  },
  dropzoneText: {
    // backgroundColor: "#EFEFEF",
    fontSize: 18,
  },
}));
