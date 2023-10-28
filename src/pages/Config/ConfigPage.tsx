import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonList, IonNavLink, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { saveConfig } from "../../commons/ConfigStorage";
import { LENGTH_LONG, sleep } from '../../commons/Constants';
import requestPermission from "../../commons/Permissions";
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import FormButton from '../../components/FormButton';
import InputFile from '../../components/InputFile';
import { Config } from '../../models/Config';
import { File } from '../../models/File';
import Execution from '../Execution/Execution';
import './ConfigPage.css';


const ConfigPage = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [isTouchedExecutions, setIsTouchedExecutions] = useState(false);
  const [isTouchedDownload, setIsTouchedDownload] = useState(false);
  const [isTouchedServer, setIsTouchedServer] = useState(false);
  // const [isTouched, setIsTouched] = useState(false);
  // const [isTouched, setIsTouched] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>(true);

  const [testLoad, setTestLoad] = useState("");
  const [mediaFile, setMediaFile] = useState<File>({ name: "", path: "" });
  const [uploadFile, setUploadFile] = useState<File>({ name: "", path: "" });
  const [downloadFile, setDownloadFile] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [scenario, setScenario] = useState(0);

  useEffect(() => {

    requestPermission()
      .then(() => {
        console.log(`Permissions Granted`);
      })
      .catch((error) => {
        console.error(`Permissions error: ${JSON.stringify(error)}`);
        setSnackMessage(`Permissions error: ${JSON.stringify(error)}`);
        setShowSnack(true);
      });

  }, []);

  const handleSave = async () => {
    setSnackMessage(`Saved`);
    setShowSnack(true);

    try {
      const config = {
        testLoad: parseInt(testLoad),
        mediaFile: { name: mediaFile.name, path: mediaFile.path },
        uploadFile: {
          uri: uploadFile.path,
          name: uploadFile.name,
          type: uploadFile.mimeType,
        },
        downloadFile,
        serverUrl,
        specificScenario: scenario,
      } as Config;

      await saveConfig(config);

      const strConfig = `Config Saved: ${JSON.stringify(config)}`;
      console.log(strConfig);

      setSnackMessage(`${strConfig}`);
      setShowSnack(true);
    } catch (error) {
      const strError = `Config Save error: ${JSON.stringify(error)}`;
      console.error(strError);
      setSnackMessage(`${strError}`);
      setShowSnack(true);
    }

    await sleep();
    history.push('/Execution');
  };

  /////// validations SATRT
  const [executionsError, setExecutionsError] = useState();
  const [donwaloadFileError, setDonwaloadFileError] = useState();
  const [serverUrlError, setServerUrlError] = useState();
  const [mediaFileError, setMediaFileError] = useState();
  const [uploadFileError, setUploadFileError] = useState();

  useEffect(() => {
    if (donwaloadFileError || executionsError || serverUrlError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [executionsError, donwaloadFileError, serverUrlError]);
  /////// END validations

  return (
    <>
      <AppBar title='Config' />
      <IonContent className="ion-padding">
        <IonGrid>

          <IonRow className="ion-margin-top ion-padding-top ion-margin-bottom">
            <IonCol size="12">

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedExecutions && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Executions"
                type="number"
                value={testLoad}
                errorText={executionsError}
                onIonChange={(e) => setTestLoad(e.detail.value!.trim())}
                onIonInput={(e) => setTestLoad(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedExecutions(true);
                  setExecutionsError(validateField("executions", testLoad))
                }}
              ></IonInput>
              <InputFile
                value={mediaFile.name}
                placeholder="Media file"
                setFile={setMediaFile}
                fileTypes={['video/*']}
              ></InputFile>
              <InputFile
                value={uploadFile.name}
                placeholder="Upload file"
                setFile={setUploadFile}
                fileTypes={['*/*']}
              ></InputFile>
              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedDownload && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Download file name"
                type="text"
                value={downloadFile}
                errorText={executionsError}
                onIonChange={(e) => setDownloadFile(e.detail.value?.trim() || '')}
                onIonInput={(e) => setDownloadFile(e.detail.value!.trim() || '')}
                onIonBlur={(event) => {
                  setIsTouchedDownload(true);
                  setDonwaloadFileError(validateField("downloadFile", downloadFile))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'}  ${isTouchedServer && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Server url"
                type="url"
                value={serverUrl}
                errorText={serverUrlError}
                onIonChange={(e) => setServerUrl(e.detail.value!.trim())}
                onIonInput={(e) => setServerUrl(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedServer(true);
                  setServerUrlError(validateField("serverUrl", serverUrl))
                }}
              ></IonInput>

              <IonList style={{ marginLeft: -15, paddingLeft: 0, }}>
                <IonItem>
                  <IonSelect
                    justify="space-between"
                    aria-label="Specific-scenario"
                    interface="popover"
                    placeholder="Scenario"
                    value={scenario}
                    onIonChange={(e) => setScenario(e.detail.value!.trim())}
                  >
                    <IonSelectOption value="0">Select scenario</IonSelectOption>
                    <IonSelectOption value="1">1 - Login API</IonSelectOption>
                    <IonSelectOption value="2">2 - Account Form</IonSelectOption>
                    <IonSelectOption value="3">3 - Download File</IonSelectOption>
                    <IonSelectOption value="4">4 - Upload File</IonSelectOption>
                    <IonSelectOption value="5">5 - Media Execution</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>

              <p style={{ marginTop: 10, fontSize: 14 }}>
                If a specific scenario was selected, then only this
                scenario will be executed N times, where N = Executions
              </p>

              {/* <IonNavLink routerDirection="forward" component={() => <Execution />}> */}
              <FormButton
                title="Save Config"
                onPress={handleSave}
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

export default ConfigPage;
