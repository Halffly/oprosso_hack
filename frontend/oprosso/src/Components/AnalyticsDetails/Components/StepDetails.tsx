import { Box, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "../../../consts/theme";
interface IProps {
  title: string;
  value: string;
}
const StepDetails = ({ title, value }: IProps) => {
  return (
    <Box
      textAlign="center"
      style={{ backgroundColor: "#EFEFEF", height: "100%" }}
      paddingBottom={2}
      paddingX={2}
      borderRadius={8}
    >
      <Typography
        style={{
          color: theme.palette.primary.main,
          fontSize: 36,
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
      <Box
        minHeight={44}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
};

export default StepDetails;
