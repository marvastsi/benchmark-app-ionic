import { IonCol, IonContent, IonGrid, IonInput, IonRow } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { retrieveConfig } from '../../commons/ConfigStorage';
import { LENGTH_MEDIUM, sleep } from '../../commons/Constants';
import { saveToken } from '../../commons/CredentialStorage';
import { data } from '../../commons/data';
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import FormButton from '../../components/FormButton';
import { HttpException } from '../../http/errors/HttpException';
import HttpClient from '../../http/services/HttpClient';
import './LoginPage.css';

const LoginPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  ///Form Fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoaded(false);
    loadConfig();
  }, [history]);

  useEffect(() => {
    if (loaded) {
      setUsername(data.account.username);
      setPassword(data.account.password);
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleLogin();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        setSnackMessage(`Login loading error: ${error.message}`);
        setShowSnack(true);
      });
  }

  const handleLogin = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const token = await client.login({ username, password });

      if (token) {
        saveToken(token);

        setSnackMessage(`${token.value}`);
        setShowSnack(true);
      }
    } catch (error) {
      let err = error as HttpException;
      setSnackMessage(`${err.status}: Login failed`);
      setShowSnack(true);
    }

    await sleep();
    history.goBack();
  };

  /////// validations START
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [isTouchedPass, setIsTouchedPass] = useState(false);
  const [isTouchedUsername, setIsTouchedUsername] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>();

  useEffect(() => {
    if (usernameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, passwordError]);
  /////// END validations

  return (
    <>
      <AppBar title='Login' backHref='/Execution' />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedUsername && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Username"
                type="text"
                value={username}
                errorText={usernameError}
                onIonChange={(e) => setUsername(e.detail.value!.trim())}
                onIonInput={(e) => setUsername(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedUsername(true);
                  setUsernameError(validateField("loginUsername", username))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedPass && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Password"
                type="password"
                value={password}
                errorText={passwordError}
                onIonChange={(e) => setPassword(e.detail.value!.trim())}
                onIonInput={(e) => setPassword(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedPass(true);
                  setPasswordError(validateField("loginPassword", password))
                }}
              ></IonInput>

              <FormButton
                title="Login"
                onPress={handleLogin}
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


export default LoginPage;
