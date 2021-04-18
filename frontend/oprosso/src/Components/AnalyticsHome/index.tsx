import { Box, Grid, LinearProgress } from "@material-ui/core";
import React from "react";
import { getAllAppsId } from "../../tools/getAllAppsId";
import Card from "../Card";
import { CardPrototype } from "../Card/Models";

const appsList: CardPrototype[] = [
  {
    id: 0,
    title: "Zoom app redesign",
    views: 200,
    rate: 4,
    imageUrl:
      "https://cdn.dribbble.com/users/702789/screenshots/15487422/media/b1bdbc126699b7cdad71af724103d51d.png?compress=1&resize=1600x1200",
  },
  {
    id: 0,
    title: "Приложение Поиск доктора",
    views: 20,
    rate: 4.5,
    imageUrl:
      "https://cdn.dribbble.com/users/1963775/screenshots/15483648/media/8bbf309a418ac6a88f4f755b8b599b04.png?compress=1&resize=1600x1200",
  },
  {
    id: 0,
    title: "Приложение для путешествий по России",
    views: 200,
    rate: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1618508049606-5f07a78b758b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 0,
    title: "Приложение для путешествий по России",
    views: 200,
    rate: 4,
    imageUrl:
      "https://cdn.dribbble.com/users/653699/screenshots/15420052/media/7633ce9b2a3e532d4d47531e65541edd.png?compress=1&resize=1600x1200",
  },
  {
    id: 0,
    title: "Приложение для путешествий по России",
    views: 200,
    rate: 4,
    imageUrl:
      "https://cdn.dribbble.com/users/5031392/screenshots/15489774/media/8013dbe688d425fbf8040ece0a49be4a.png?compress=1&resize=1600x1200",
  },
  {
    id: 0,
    title: "Приложение для путешествий",
    views: 200,
    rate: 4,
    imageUrl:
      "https://cdn.dribbble.com/users/4189231/screenshots/15005457/media/82ddeeeca93f0a022ff77517294f711d.png?compress=1&resize=1600x1200",
  },
  {
    id: 0,
    title: "Приложение для путешествий по России",
    views: 200,
    rate: 4,
    imageUrl:
      "https://cdn.dribbble.com/users/653699/screenshots/15489025/media/d7af516032094ebd13ef3fb0f337b95a.png?compress=1&resize=1600x1200",
  },
];

const AnalyticsHome = () => {
  const [data, setData] = React.useState<CardPrototype[]>();
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    (async () => {
      const ids = await getAllAppsId();
      if (ids) {
        const arr: CardPrototype[] = [];
        ids.forEach((id, index) => arr.push({ ...appsList[index], id }));
        setData(arr);
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Box marginTop={4}>
      <Grid container spacing={4}>
        {data &&
          data.map((x) => (
            <Grid key={x.id} item md={4} xs={12}>
              <Card {...x} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AnalyticsHome;
