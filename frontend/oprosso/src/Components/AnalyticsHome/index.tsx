import { Box, Grid } from "@material-ui/core";
import React from "react";
import Card from "../Card";
import { CardPrototype } from "../Card/Models";

const AnalyticsHome = () => {
  const [data, setData] = React.useState<CardPrototype[]>([
    {
      id: 1,
      title: "Zoom app redesign",
      views: 200,
      rate: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1618554718460-c50e3cb2a708?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 2,
      title: "Приложение Поиск доктора",
      views: 20,
      rate: 4.5,
      imageUrl:
        "https://images.unsplash.com/photo-1618583325313-be06d28ce34f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ]);
  return (
    <Box marginTop={4}>
      <Grid container spacing={4}>
        {data.map((x) => (
          <Grid key={x.id} item md={4} xs={12}>
            <Card {...x} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnalyticsHome;
