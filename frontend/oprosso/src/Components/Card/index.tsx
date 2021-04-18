import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useCardStyles } from "../../Styles/useStyles";
import { ReactComponent as EyeIcon } from "./assets/eye.svg";
import { ReactComponent as Devider } from "./assets/devider.svg";
import { CardPrototype } from "./Models";
import { useHistory } from "react-router-dom";

interface IProps extends CardPrototype {
  isGallery?: boolean;
}

const Card = ({ title, views, rate, imageUrl, id, isGallery }: IProps) => {
  const cardStyles = useCardStyles();
  const history = useHistory();
  const redirectHandler = () => {
    history.push(isGallery ? `/test/${id}` : `/analytics/${id}`);
  };
  return (
    <div
      style={{
        background: `url(${imageUrl})`,
        textAlign: "left",
      }}
      className={cardStyles.wrapper}
      onClick={redirectHandler}
    >
      <div className={cardStyles.contentWrapper}>
        <div>
          <Typography className={cardStyles.mainTitle} component="h6">
            {title}
          </Typography>
          <Typography className={cardStyles.subitle}>Кравцов Леонид</Typography>
        </div>
        <Box display="flex" alignSelf="flex-end">
          <Box position="relative" display="flex" marginRight={2}>
            <Box marginBottom={1} marginX={1}>
              <Typography className={cardStyles.rateText}>{rate}</Typography>
            </Box>
            <Box position="absolute" bottom={0} right={"13%"}>
              <Devider />
            </Box>
            <Box marginTop={1}>
              <Typography className={cardStyles.rateText}>5</Typography>
            </Box>
          </Box>
          <Box marginRight={1}>
            <EyeIcon />
          </Box>
          <Typography
            className={cardStyles.title}
            component="h6"
          >
            {views}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Card;
