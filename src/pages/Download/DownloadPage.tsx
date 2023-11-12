import { IonCol, IonContent, IonGrid, IonInput, IonRow, withIonLifeCycle } from "@ionic/react";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_MEDIUM, sleep } from "../../commons/Constants";
import validateField from "../../commons/validator/Validator";
import AppBar from "../../components/AppBar";
import FormButton from "../../components/FormButton";
import { HttpException } from "../../http/errors/HttpException";
import HttpClient from "../../http/services/HttpClient";
import "./DownloadPage.css";

const DownloadPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setLoaded(false);
    loadConfig();
  }, [history]);

  useEffect(() => {
    if (loaded) {
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleDownload();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setFileName(config.downloadFile);
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        setSnackMessage(`Download loading error: ${error.message}`);
        setShowSnack(true);
      });
  };

  const handleDownload = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const result = await client.download(fileName);

      if (result) {
        console.log(`${result}`);
        setSnackMessage(`Download Executed: ${result.toString()}`);
        setShowSnack(true);
      }
    } catch (error) {
      let err = error as HttpException;
      console.log(`${error}`);
      setSnackMessage(`${err.status}: Download failed`);
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
      <AppBar title='Download' backHref='/Execution' />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-margin-top ion-padding-top ion-margin-bottom">
            <IonCol size="12">
              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                placeholder="Download file"
                autoCorrect="off"
                type="text"
                value={fileName}
                onIonChange={(e) => setFileName(e.detail.value!.trim())}
                onIonInput={(e) => setFileName(e.detail.value!.trim())}
                onIonBlur={(e) => {
                  markTouched();
                  setFileNameError(validateField("downloadFile", fileName));
                }}
                errorText={fileNameError}
              />

              <FormButton
                title="Download"
                onPress={handleDownload}
                disabled={!formValid}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Snackbar
        open={showSnack}
        autoHideDuration={LENGTH_MEDIUM}
        message={snackMessage}
      />
    </>
  );
};

export default withIonLifeCycle(DownloadPage);
