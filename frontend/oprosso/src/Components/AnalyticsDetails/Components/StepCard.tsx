import { Box, Typography } from "@material-ui/core";
import { isFunction } from "lodash";
import React from "react";
import { theme } from "../../../consts/theme";
import { Step } from "../Models";
interface IProps extends Step {
  onClick: (id: number) => void;
  isActive?: boolean;
}
const StepCard = ({
  onClick,
  stepTitle: title,
  stepText: text,
  id,
  isActive,
}: IProps) => {
  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
        cursor: isFunction(onClick) ? "pointer" : undefined,
        backgroundColor: isActive ? theme.palette.primary.main : "#EFEFEF",
        color: isActive ? "#fff" : "#000",
      }}
      padding={2}
      onClick={() => {
        isFunction(onClick) && onClick(id);
      }}
      borderRadius={8}
    >
      <Typography
        variant="subtitle1"
        style={{ fontWeight: "bold", fontSize: 20 }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" style={{ whiteSpace: "pre-wrap" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default StepCard;
