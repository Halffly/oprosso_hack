import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import { api } from "../../api/api";
import {
  useAnalyticsPageStyles,
  useDropZoneStyles,
} from "../../Styles/useStyles";
import StepCard from "../AnalyticsDetails/Components/StepCard";
import { Step } from "../AnalyticsDetails/Models";
import { FilledTextInput, FilledTextInputBase } from "../FilledTextInput";
import { RoundedButton } from "../RoundedButton";
import { IApplication } from "./Models";

const CreateScreen = () => {
  const analyticClasses = useAnalyticsPageStyles();
  const dropZoneClasses = useDropZoneStyles();
  const [, setPhoto] = React.useState<File[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<IApplication>();
  const [allApplications, setAllApplications] = React.useState<IApplication[]>(
    []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const apps: IApplication[] = await api.getApps();
        apps &&
          (() => {
            setAllApplications(apps);
            setSelectedApp(apps[0]);
          })();
      } catch {
        // enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const dialogOpenHandler = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const saveHandler = async () => {
    dialogOpenHandler();
  };
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <>
      <Dialog
        open={isDialogOpen}
        PaperProps={{
          style: { borderRadius: 24 },
        }}
        onClose={dialogOpenHandler}
      >
        <Box marginX={4} marginY={5}>
          <Box marginBottom={3}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Поделитесь ссылкой на тестирование
            </Typography>
          </Box>
          <Box marginY={2}>
            <FilledTextInput
              variant="filled"
              value={`${window.location.protocol + "//" + window.location.host}/test/${selectedApp?.id}`}
              fullWidth
              disabled
              label="Ссылка на приложение"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              backgroundColor: "#FE7B12",
              borderRadius: 48,
            }}
            onClick={dialogOpenHandler}
          >
            <Box marginX={10} marginY={1}>
              <Typography style={{ color: "#FFF", fontWeight: 600 }}>
                Готово
              </Typography>
            </Box>
          </Button>
        </Box>
      </Dialog>
      <Box marginY={4}>
        <Grid container spacing={4}>
          <Grid item md={5} xs={12}>
            <Box className={dropZoneClasses.dropZoneRoot} marginTop={2}>
              <DropzoneArea
                dropzoneText="Добавить обложку"
                filesLimit={1}
                maxFileSize={10000000}
                acceptedFiles={["image/png", "image/jpeg"]}
                onChange={setPhoto}
                showPreviewsInDropzone={true}
                previewGridClasses={{
                  container: dropZoneClasses.previewLogoContainer,
                  // item: dropZoneClasses.previewItemContainer,
                }}
                showAlerts={false}
                previewText=""
                dropzoneParagraphClass={dropZoneClasses.dropzoneText}
                classes={{
                  root: dropZoneClasses.dropZoneRoot,
                  icon: dropZoneClasses.dropZoneLogoIcon,
                }}
              />
            </Box>
          </Grid>
          <Grid item md={7} xs={12}>
            <Box textAlign="left" marginTop={3}>
              <FilledTextInput
                placeholder="Мое приложение по еде"
                variant="filled"
                fullWidth
                label="Название"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="left" marginTop={3}>
              <FilledTextInput
                placeholder="Международная картографическая компания, выпускающая одноимённые электронные справочники с картами городов 
              с 1999 года."
                multiline
                variant="filled"
                fullWidth
                label="Описание приложения"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="left" marginTop={3}>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                fullWidth
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                input={<FilledTextInputBase />}
                value={selectedApp?.id}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setSelectedApp(
                    allApplications.find(
                      (x) => x.id === (event.target.value as number)
                    )
                  );
                }}
              >
                {allApplications.map((x) => (
                  <MenuItem value={x.id}>
                    v{x.id}:{" "}
                    <span style={{ fontWeight: 600 }}>{"  " + x.name}</span>
                  </MenuItem>
                ))}
                {!allApplications.length && (
                  <MenuItem disabled value={0}>
                    У Вас еще нет сборок
                  </MenuItem>
                )}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Box marginRight={3} marginTop={0.5}>
                <Typography variant="h4" className={analyticClasses.headline}>
                  Сценарии
                </Typography>
              </Box>
              <RoundedButton
                style={{ marginRight: 16 }}
                onClick={() => {
                  setSteps([
                    ...steps,
                    {
                      stepTitle: "Сценарий 1:«Поделиться информацией»",
                      stepText:
                        "В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google...",
                      question: ["ВОпрос в конце"],
                      id: steps.length,
                    },
                  ]);
                }}
              >
                Новый сценарий
              </RoundedButton>
              <RoundedButton
                style={{ borderColor: "#C4C4C4", color: "#C4C4C4" }}
                disabled
              >
                Изменить
              </RoundedButton>
            </Box>
          </Grid>
          {steps.map((step, index) => (
            <Grid item md={4} xs={12}>
              <StepCard onClick={(id: number) => {}} {...step} />
            </Grid>
          ))}
        </Grid>
        <Grid>
          <>
            <Box marginY={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="subtitle1">
                    Сделать работу видимой в маркетплейсе
                  </Typography>
                }
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  backgroundColor: "#FE7B12",
                  borderRadius: 48,
                }}
                onClick={saveHandler}
              >
                <Box marginX={10} marginY={1}>
                  <Typography style={{ color: "#FFF", fontWeight: 600 }}>
                    Далее
                  </Typography>
                </Box>
              </Button>
            </Box>
          </>
        </Grid>
      </Box>
    </>
  );
};

export default CreateScreen;
