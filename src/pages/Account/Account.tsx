import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonRow, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { LENGTH_LONG, sleep } from '../../commons/Constants';
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import { HttpException } from '../../http/errors/HttpException';
import HttpClient from '../../http/services/HttpClient';
import Execution from '../Execution/Execution';
import './Account.css';
import FormButton from '../../components/FormButton';
import { useHistory } from 'react-router';

const Account: React.FC = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("http://192.168.100.115:3000/api");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  ///Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [active, setActive] = useState(false);
  const [notification, setNotification] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /////// validations START
  const [firstNameError, setFirstNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [countryCodeError, setCountryCodeError] = useState();
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

  const handleAccount = async () => {

    try {
      const client = new HttpClient(baseUrl);
      const AccountCreated = await client.saveAccount({
        firstName, lastName, email,
        phoneNumber, phoneCountryCode: countryCode,
        active, notification,
        username, password
      });

      if (AccountCreated) {
        console.log(`${AccountCreated}`);
        setSnackMessage(`${AccountCreated}`);
        setShowSnack(true);
      }
    } catch (error) {
      let err = error as HttpException;
      setSnackMessage(`${err.status}: Account failed`);
      setShowSnack(true);
    }

    await sleep(3000);
    history.goBack();
  };

  return (
    <>
      <AppBar title='Account' />
      <IonContent className="ion-padding">
        <h1>Account Page</h1>
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
                placeholder="First name"
                type="text"
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value!.trim())}
                errorText={firstNameError}
                onIonBlur={(event) => {
                  setFirstNameError(validateField("firstName", firstName))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Last name"
                type="text"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value?.trim() || '')}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Email"
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!.trim())}
                errorText={email}
                onIonBlur={(event) => {
                  setEmailError(validateField("email", email))
                }}
              ></IonInput>

              {/* Implementar uma lista/combobox/spinner ${countryCodeError} */}
              <IonList>
                <IonItem>
                  <IonSelect                    
                    aria-label="Phone-Country-Code"
                    interface="popover"
                    placeholder="Coutry Code"
                    value={countryCode}
                    onIonChange={(e) => setCountryCode(e.detail.value!.trim())}
                    onIonCancel={() => setCountryCodeError(validateField("countryCode", countryCode))}
                    onIonDismiss={() => setCountryCodeError(validateField("countryCode", countryCode))}
                  >
                    <IonSelectOption value="+55">+55 BRA</IonSelectOption>
                    <IonSelectOption value="+1">+1 USA</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Phone Number"
                type="number"
                value={phoneNumber}
                onIonChange={(e) => setPhoneNumber(e.detail.value!.trim())}
                errorText={phoneNumberError}
                onIonBlur={(event) => {
                  setPhoneNumberError(validateField("phoneNumber", phoneNumber))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Username"
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!.trim())}
                errorText={usernameError}
                onIonBlur={(event) => {
                  setUsernameError(validateField("username", username))
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
                  setPasswordError(validateField("password", password))
                }}
              ></IonInput>

              {/* <IonNavLink routerDirection="back" component={() => <Execution />}> */}
              <FormButton
                title="Account"
                onPress={handleAccount}
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


export default Account;
