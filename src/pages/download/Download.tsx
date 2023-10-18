import { IonCol, IonContent, IonGrid, IonInput, IonNavLink, IonRow } from "@ionic/react";
// import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_LONG, sleep } from "../../commons/Constants";
import validateField from "../../commons/validator/Validator";
import AppBar from "../../components/AppBar";
import FormButton from "../../components/FormButton";
import { HttpException } from "../../http/errors/HttpException";
import HttpClient from "../../http/services/HttpClient";
import Execution from "../Execution/Execution";
import "./Download.css";
import { Snackbar } from "@mui/material";

const Download = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [baseUrl, setBaseUrl] = useState("http://192.168.100.129:3000/api");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");

  // useFocusEffect(useCallback(() => {
  //   setLoaded(false);
  //   loadConfig();
  // }, []));

  // useEffect(() => {
  //   if (loaded) {
  ////     setFileName("file.png");
  //     setValuesFilled(true);
  //   }
  // }, [loaded])

  // useEffect(() => {
  //   if (valuesFilled) {
  //     setValuesFilled(false);
  //     handleDownload();
  //   }
  // }, [valuesFilled])

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

  // useeffect(() => {
  //   const unsubscribe = navigation.addlistener('focus', () => {
  //     console.log('in navigation add listener block');
  //     loaddata();
  //   return unsubscribe;
  // }, [navigation]);

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
    markTouched();
    if (fileNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [fileNameError]);
  /////// END validations

  return (
    <>
      <AppBar title='Download' />
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
                onBlur={(event) => {
                  setFileNameError(validateField("downloadFile", fileName))
                }}
                errorText={fileNameError}
              />

              {/* <IonNavLink routerDirection="back" component={() => <Execution />}> */}
                <FormButton
                  title="Download"
                  onPress={handleDownload}
                  disabled={!formValid}
                />
              {/* </IonNavLink> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Snackbar
        open={showSnack}
        autoHideDuration={LENGTH_LONG}
        message={snackMessage}
      />
    </>
  );
};

export default Download;
