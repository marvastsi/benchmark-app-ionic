import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonNavLink, IonProgressBar, IonRow, IonSpinner } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { LENGTH_LONG, sleep } from '../../commons/Constants';
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import { HttpException } from '../../http/errors/HttpException';
import HttpClient from '../../http/services/HttpClient';
import Execution from '../Execution/Execution';
import './Login2.css';

const Login2: React.FC = () => {
  const [showSnack, setShowSnack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("http://192.168.100.115:3000/api");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /////// validations SATRT
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [isTouched, setIsTouched] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>();

  const markTouched = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    markTouched();
    if (usernameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, passwordError]);
  /////// END validations

  const handleLogin = async () => {
    setIsLoading(true);
    setSnackMessage(`User: ${username}, Pass: ${password}`);
    setShowSnack(true);
    console.log(`User: ${username}, Pass: ${password}`);

    // try {
    //   const client = new HttpClient(baseUrl);
    //   const token = await client.login({ username, password });

    //   if (token) {
    //     // saveToken(token);
    //     console.log(`Token: ${token}`);
    //     setSnackMessage(`${token}`);
    //     setShowSnack(true);
    //   }
    // } catch (error) {
    //   let err = error as HttpException;
    //   setSnackMessage(`${err.status}: Login failed`);
    //   setShowSnack(true);
    // }

    await sleep(5000);
    setIsLoading(false);
  };

  return (
    <>
      <AppBar title='Login' />
      <IonContent className="ion-padding">
        <h1>Login Page</h1>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className="heading-text">
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top ion-margin-bottom">
            <IonCol size="12">

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Username"
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!.trim())}
                errorText={usernameError}
                onIonBlur={(event) => {
                  setUsernameError(validateField("loginUsername", username))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!.trim())}
                errorText={passwordError}
                onIonBlur={(event) => {
                  setPasswordError(validateField("loginPassword", password))
                }}
              ></IonInput>

              <IonNavLink routerDirection="back" component={() => <Execution />}>

                {(
                  <IonSpinner style={(isLoading) ? styles.spinnerShow : styles.spinnerHide}></IonSpinner>
                )}
                <IonButton onClick={() => handleLogin()} expand="block" style={(isLoading) ? styles.buttonLoading : styles.button}
                >Login</IonButton>
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

const styles = {
  button: {
    marginTop: 50,
    marginLeft: 48,
    marginRight: 48,
    borderRadius: 4,
    elevation: 6,
    height: 40,
    backgroundColor: "teal",
    zIndex: 0,
    opacity: 1,
  },
  buttonLoading: {
    marginTop: 50,
    marginLeft: 48,
    marginRight: 48,
    borderRadius: 4,
    elevation: 6,
    height: 40,
    backgroundColor: "teal",
    zIndex: 0,
    opacity: 0.6,
  },
  spinnerShow: {
    zIndex: 1,
    marginBottom: -87,
    marginLeft: 140,
    color: "teal"
  },
  spinnerHide: {
    zIndex: -1,
    marginBottom: -87,
    marginLeft: 140,
    color: "teal"
  },
}

export default Login2;
