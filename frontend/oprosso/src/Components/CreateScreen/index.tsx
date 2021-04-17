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
import { api } from "../../api/api";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const validatePrototype = () => {};
  const saveHandler = async () => {
    // if (!validatePrototype(prototype)) {
    //   return;
    // }
    // (async () => {
    //   try {
    //     setIsLoading(true);
    //     const isSuccess = await api.createProtorype(prototype);
    //     isSuccess &&
    //       (() => {
    //         //
    //       })();
    //   } catch {
    //     // enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // })();
    console.log(photo[0]);
    const img: Blob = new Blob(
      [new Uint8Array(await photo[0].arrayBuffer())],
      {
        type: photo[0].type,
      }
    );
    var fd = new FormData();
    fd.append('file', img);
    
    console.log(fd);
    let fileToBlob = async (file:File) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
// console.log(await fileToBlob(photo[0]));

    api.createProtorype({
      isShow: false,
      title: "Дргое приложение",
      app:
        "https://trashbox.ru/files20/1425479_d892e0/com.supercell.clashofclans_14.0.4_1346.apk",
      description:
        "Международная картографическая компания, выпускающая одноимённые электронные справочники с картами городов с 1999 года.",
      views: 20,
      rate: 4.3,
      img: await fileToBlob(photo[0]),
      id: 2,
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
      ],
    });
  };
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
                  Опубликовать
                </Typography>
              </Box>
            </Button>
          </Box>
        </>
      </Grid>
    </Box>
  );
};

export default CreateScreen;
