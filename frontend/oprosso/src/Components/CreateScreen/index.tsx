import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import {
  useAnalyticsPageStyles,
  useDropZoneStyles,
} from "../../Styles/useStyles";
import StepCard from "../AnalyticsDetails/Components/StepCard";
import { Step } from "../AnalyticsDetails/Models";
import { FilledTextInput } from "../FilledTextInput";
import { RoundedButton } from "../RoundedButton";

const CreateScreen = () => {
  const analyticClasses = useAnalyticsPageStyles();
  const dropZoneClasses = useDropZoneStyles();
  const [photo, setPhoto] = React.useState<File[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  return (
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
            <FilledTextInput
              placeholder="https://mySite.com/npp/app-release.apk"
              variant="filled"
              fullWidth
              label="Ссылка на apk файл или zip архив"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
                    title: "Сценарий 1:«Поделиться информацией»",
                    text:
                      "В приложении 2ГИС воспользоваться функцией «Поделиться информацией» на примере организации Google...",
                    endQuestions: ["ВОпрос в конце"],
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
            >
              <Box marginX={10} marginY={1}>
                <Typography style={{ color: "#FFF", fontWeight: 600 }}>Опубликовать</Typography>
              </Box>
            </Button>
          </Box>
        </>
      </Grid>
    </Box>
  );
};

export default CreateScreen;
