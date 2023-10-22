import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonRow } from "@ionic/react";
// import { useFocusEffect } from "@react-navigation/native";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_LONG, sleep } from "../../commons/Constants";
import validateField from "../../commons/validator/Validator";
import AppBar from "../../components/AppBar";
import FormButton from "../../components/FormButton";
import { HttpException } from "../../http/errors/HttpException";
import HttpClient from "../../http/services/HttpClient";
import { FileUpload } from "../../models/FileUpload";
import "./UploadPage.css";
import InputFile from "../../components/InputFile";
import { File } from "../../models/File";

const UploadPage = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [baseUrl, setBaseUrl] = useState("http://192.168.100.129:3000/api");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<FileUpload>({
    name: "",
    uri: null,
    type: null,
  });


  const setUpload = (file: File) => {
    setUploadFile({
      uri: file.path,
      name: file.name,
      type: file.mimeType,
    });
    setFileName(file.name || ' ');
  }


  // useFocusEffect(useCallback(() => {
  //   setLoaded(false);
  //   loadConfig();
  // }, []));

  // useEffect(() => {
  //   if (loaded) {
  ////     setFileName(uploadFile.name);
  //     setValuesFilled(true);
  //   }
  // }, [loaded])

  // useEffect(() => {
  //   if (valuesFilled) {
  //     setValuesFilled(false);
  //     handlUpload();
  //   }
  // }, [valuesFilled])

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

  // useeffect(() => {
  //   const unsubscribe = navigation.addlistener('focus', () => {
  //     console.log('in navigation add listener block');
  //     loaddata();
  //   return unsubscribe;
  // }, [navigation]);

  const handleUpload = async () => {
    try {
      const client = new HttpClient(baseUrl);

      setSnackMessage(`${JSON.stringify(uploadFile)}`);
      setShowSnack(true);
await sleep(LENGTH_LONG);

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

    await sleep(LENGTH_LONG);
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
      <AppBar title='Upload' />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-margin-top ion-padding-top ion-margin-bottom">
            <IonCol size="12">
              <IonItem>
                <InputFile
                  value={uploadFile.name}
                  placeholder="Upload file"
                  setFile={setUpload}
                  fileTypes={['*/*']}
                />
              </IonItem>

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

              {/* <IonNavLink routerDirection="back" component={() => <Execution />}> */}
              <FormButton
                title="Upload"
                onPress={handleUpload}
                disabled={!formValid}
              />
              {/* </IonNavLink> */}
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
