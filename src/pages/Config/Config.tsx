import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonList, IonNavLink, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { saveConfig } from "../../commons/ConfigStorage";
import { LENGTH_LONG } from '../../commons/Constants';
import requestPermission from "../../commons/Permissions";
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import FormButton from '../../components/FormButton';
import InputFile from '../../components/InputFile';
import { Config } from '../../models/Config';
import { File } from '../../models/File';
import Execution from '../Execution/Execution';
import './Config.css';


const Config: React.FC = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [isTouched, setIsTouched] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>(true);

  const [testLoad, setTestLoad] = useState("");
  const [mediaFile, setMediaFile] = useState<File>({ name: "", path: "" });
  const [uploadFile, setUploadFile] = useState<File>({ name: "", path: "" });
  const [downloadFile, setDownloadFile] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [scenario, setScenario] = useState(0);

  const [items, setItems] = useState([
    { label: "Select scenario", value: 0 },
    { label: "1 - Login API", value: 1 },
    { label: "2 - Account Form", value: 2 },
    { label: "3 - Download File", value: 3 },
    { label: "4 - Upload File", value: 4 },
    { label: "5 - Media Execution", value: 5 },
  ]);

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

    // await sleep();
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
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Executions"
                type="number"
                value={testLoad}
                onIonChange={(e) => setTestLoad(e.detail.value!.trim())}
                errorText={executionsError}
                onIonBlur={(event) => {
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
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} 'ion-touched'`}
                autoCorrect="off"
                placeholder="Download file name"
                type="text"
                value={downloadFile}
                onIonChange={(e) => setDownloadFile(e.detail.value?.trim() || '')}
                errorText={executionsError}
                onIonBlur={(event) => {
                  setDonwaloadFileError(validateField("downloadFile", downloadFile))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'}  'ion-touched'`}
                autoCorrect="off"
                placeholder="Server url"
                type="url"
                value={serverUrl}
                onIonChange={(e) => setServerUrl(e.detail.value!.trim())}
                errorText={serverUrlError}
                onIonBlur={(event) => {
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

              <IonNavLink routerDirection="forward" component={() => <Execution />}>
                <FormButton
                  title="Save Config"
                  onPress={handleSave}
                  disabled={!formValid}
                />
              </IonNavLink>
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

export default Config;
