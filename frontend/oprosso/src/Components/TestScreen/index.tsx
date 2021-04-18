import { Box, Button, LinearProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import Card from "../Card";
import { IApplication } from "../CreateScreen/Models";

const TestScreen = () => {
  const id = useParams<{ id: string }>()?.id;
  const [app, setApp] = useState<IApplication>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const app: IApplication = await api.getAppsById(id);
        app &&
          (() => {
            setApp(app);
          })();
      } catch {
        setIsError(true);
        // enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  if (isLoading) {
    return <LinearProgress />;
  }
  if (isError) {
    return (
      <Box marginTop={4}>
        <Typography variant="h4">Данного приложения не существует</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box textAlign="center">
        <Card
          {...{
            id: 3,
            title: "Приложение для путешествий по России",
            views: 200,
            rate: 4,
            imageUrl:
              "https://images.unsplash.com/photo-1618508049606-5f07a78b758b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          }}
          isGallery
        />
        <Box textAlign="left" marginY={2}>
          <Typography>
            Международная картографическая компания, выпускающая одноимённые
            электронные справочники с картами городов с 1999 года.
          </Typography>
        </Box>
        <Box marginTop={5} marginBottom={2}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              backgroundColor: "#FE7B12",
              borderRadius: 48,
            }}
            href={app?.file || ""}
            download
          >
            <Box marginX={10} marginY={1}>
              <Typography style={{ color: "#FFF", fontWeight: 600 }}>
                Скачать
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TestScreen;
