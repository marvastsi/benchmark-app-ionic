import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonRow } from "@ionic/react";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import validateField from "../../commons/validator/Validator";
import AppBar from "../../components/AppBar";
import FormButton from "../../components/FormButton";
import { HttpException } from "../../http/errors/HttpException";
import HttpClient from "../../http/services/HttpClient";
import { FileUpload } from "../../models/FileUpload";
import "./UploadPage.css";

const UploadPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<FileUpload>({
    name: "",
    uri: null,
    type: null,
  });

  useEffect(() => {
    setLoaded(false);
    loadConfig();
  }, [history]);

  useEffect(() => {
    if (loaded) {
      setFileName(uploadFile.name || "");
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleUpload();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setUploadFile(config.uploadFile);
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        setSnackMessage(`Upload loading error: ${error.message}`);
        setShowSnack(true);
      });
  };

  const handleUpload = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const result = await client.upload(uploadFile);

      if (result) {
        console.log(`${result}`);
        setSnackMessage(`Upload Executed: ${result.name}`);
        setShowSnack(true);
      }
    } catch (error) {
      let err = error as HttpException;
      setSnackMessage(`${err.status}: Upload failed. ${JSON.stringify(error)} `);
      setShowSnack(true);
    }

    await sleep();
    history.goBack();
  }

  /////// validations SATRT
  const [fileNameError, setFileNameError] = useState();
  const [isTouched, setIsTouched] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>(true);

  const markTouched = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (fileNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [fileNameError]);
  /////// END validations

  return (
    <>
      <AppBar title='Upload' backHref='/Execution' />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-margin-top ion-padding-top ion-margin-bottom">
            <IonCol size="12">
              <IonItem>
                <IonInput
                  className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  placeholder="File to upload"
                  autoCorrect="off"
                  type="url"
                  value={fileName}
                  onIonChange={(e) => setFileName(e.detail.value!.trim())}
                  onIonInput={(e) => setFileName(e.detail.value!.trim())}
                  onIonBlur={(e) => {
                    markTouched();
                    setFileNameError(validateField("uploadFile", fileName));
                  }}
                  errorText={fileNameError}
                />
              </IonItem>

              <FormButton
                title="Upload"
                onPress={handleUpload}
                disabled={!formValid}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Snackbar
        open={showSnack}
        autoHideDuration={10000}
        message={snackMessage}
      />
    </>
  );
};

export default UploadPage;
