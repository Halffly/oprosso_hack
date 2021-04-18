import {
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useAnalyticsPageStyles } from "../../Styles/useStyles";
import { RoundedButton } from "../RoundedButton";
import StepCard from "./Components/StepCard";
import StepDetails from "./Components/StepDetails";
import { FullAnalyticsPrototype } from "./Models";

const AnalyticsDetails = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const analyticClasses = useAnalyticsPageStyles();
  const history = useHistory();
  const [
    prototypeData,
    setPrototypeData,
  ] = React.useState<FullAnalyticsPrototype>();
  const id = useParams<{ id: string }>()?.id;
  React.useEffect(() => {
    (async () => {
      const analytics = await api.getAnalytics(id);
      analytics &&
        setPrototypeData({
          Data: {
            title: "Приложение для путешествий по России",
            description:
              "Международная картографическая компания, выпускающая одноимённые электронные справочники с картами городов с 1999 года.",
            views: 20,
            rate: 4.3,
            imageUrl:
              "https://cdn.dribbble.com/users/5031392/screenshots/15489774/media/8013dbe688d425fbf8040ece0a49be4a.png?compress=1&resize=1600x1200",
            id: id,
            publicKey: "publicKey",
            steps: [
              {
                id: 2,
                stepTitle: "Поделиться информацией",
                stepText: `В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google.
  
  Шаги:
  • Открыть приложение 2ГИС• Ввести в поиск «Google»
  • В карточке организации в нижней части экрана нажать на кнопку «Поделиться»
  • Выбрать приложение и адресата, отправить текст.
  (Триггер завершения выполнения задания на устройстве.)`,
                question: ["Заметил ли ты длину пути"],
              },
              {
                id: 3,
                stepTitle: "Поделиться информацией",
                stepText: `В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google.
  
  Шаги:
  • Открыть приложение 2ГИС• Ввести в поиск «Google»
  • В карточке организации в нижней части экрана нажать на кнопку «Поделиться»
  • Выбрать приложение и адресата, отправить текст.
  (Триггер завершения выполнения задания на устройстве.)`,
                question: ["Заметил ли ты длину пути"],
              },
            ],
          },
          Analytics: {
            averageRate: 4.3,
            stepAnalytics: [
              {
                step: {
                  id: 2,
                  stepTitle: "Поделиться информацией",
                  stepText: `В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google.
  
    Шаги:
    • Открыть приложение 2ГИС• Ввести в поиск «Google»
    • В карточке организации в нижней части экрана нажать на кнопку «Поделиться»
    • Выбрать приложение и адресата, отправить текст.
    (Триггер завершения выполнения задания на устройстве.)`,
                  question: ["Заметил ли ты длину пути"],
                },
                analynics:
                  // fetch
                  [
                    ...analytics,
                    {
                      title: "Посещённых экранов",
                      value: "10",
                    },
                    {
                      title: "Время выполнения",
                      value: "89с",
                    },
                  ],
              },
              {
                step: {
                  id: 3,
                  stepTitle: "Поделиться информацией",
                  stepText: `В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google.
  
    Шаги:
    • Открыть приложение 2ГИС• Ввести в поиск «Google»
    • В карточке организации в нижней части экрана нажать на кнопку «Поделиться»
    • Выбрать приложение и адресата, отправить текст.
    (Триггер завершения выполнения задания на устройстве.)`,
                  question: ["Заметил ли ты длину пути"],
                },
                analynics: 
                [
                  {
                    title: "Оценка",
                    value: "3",
                  },
                  {
                    title: "Время выполнения",
                    value: "14:20",
                  },
                ],
              },
            ],
            userAnalytics: [
              {
                taps: [],
                rate: 3,
                feedBack: [{ UserResponse: "Да, 5 км" }],
                finalComment: "Норм дизайн",
                isFinished: true,
                stepId: 3,
              },
              {
                taps: [],
                rate: 2,
                feedBack: [{ UserResponse: "Нет" }],
                finalComment: "Da",
                isFinished: true,
                stepId: 3,
              },
              {
                taps: [],
                rate: 4,
                feedBack: [{ UserResponse: "5 км" }],
                finalComment: "Порнавилось",
                isFinished: true,
                stepId: 3,
              },
            ],
          },
        });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!prototypeData) {
    return <LinearProgress />;
  }
  return (
    <Box marginTop={4}>
      <Grid container spacing={4}>
        <Grid item md={5} xs={12}>
          <Box
            style={{
              backgroundImage: `url(${prototypeData.Data.imageUrl})`,
              backgroundSize: "cover",
              width: "100%",
              height: 333,
              borderRadius: 24,
            }}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            {prototypeData.Data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: 18,
            }}
          >
            {prototypeData.Data.description}
          </Typography>
          <Box display="flex" marginTop={"14px"}>
            <RoundedButton style={{ marginRight: 16 }}>
              Поделиться
            </RoundedButton>
            <RoundedButton
              onClick={() => {
                history.push(`/test/${prototypeData.Data.id}`);
              }}
            >
              Начать тестирование
            </RoundedButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" className={analyticClasses.headline}>
            Сценарии
          </Typography>
        </Grid>
        {prototypeData.Data.steps.map((step, index) => (
          <Grid item md={4} xs={12}>
            <StepCard
              onClick={(id: number) => {
                setActiveStep(
                  prototypeData.Data.steps.findIndex((x) => x.id === id)
                );
              }}
              {...step}
              isActive={activeStep === index}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h4" className={analyticClasses.headline}>
            Общие показатели сценария
          </Typography>
        </Grid>
        {prototypeData.Analytics.stepAnalytics[activeStep].analynics.map(
          (x, index) => (
            <Grid item md={2} xs={6} key={index}>
              <StepDetails {...x} />
            </Grid>
          )
        )}
        <Grid item xs={12}>
          <Typography variant="h4" className={analyticClasses.headline}>
            Heatmaps сценария
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" className={analyticClasses.headline}>
            Результаты тестирования сценария
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "100%", marginBottom: 70 }}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Выполнил сценарий</TableCell>
                    <TableCell align="center">Оценка</TableCell>
                    <TableCell align="center">Количество тапов</TableCell>
                    <TableCell align="center">Ответы</TableCell>
                    <TableCell align="center">Feedback</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prototypeData.Analytics.userAnalytics
                    .map((x, index) => {
                      return { id: index + 1, ...x };
                    })
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">
                          {row.isFinished ? "+" : "-"}
                        </TableCell>
                        <TableCell align="center">{row.rate}</TableCell>
                        <TableCell align="center">{row.taps.length}</TableCell>
                        <TableCell align="center">
                          {row.feedBack.map((x) => x.UserResponse).join(" | ")}
                        </TableCell>
                        <TableCell align="center">{row.finalComment}</TableCell>
                        <TableCell align="center">
                          <RoundedButton>Подробнее</RoundedButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDetails;
