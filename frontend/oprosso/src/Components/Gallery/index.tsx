import { Box, Grid } from "@material-ui/core";
import React from "react";
import Card from "../Card";
import { CardPrototype } from "../Card/Models";

const Gallery = () => {
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
        "https://images.unsplash.com/photo-1568918460973-fe7f54f82482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 3,
      title: "Приложение для путешествий по России",
      views: 200,
      rate: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1618508049606-5f07a78b758b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ]);
  return (
    <Box marginTop={4}>
        <Grid container spacing={4}>
      {data.map((x) => (
        <Grid key={x.id} item md={4} xs={12}>
          <Card {...x} isGallery />
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

export default Gallery;
