import { IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonList, IonRow, IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { retrieveConfig } from '../../commons/ConfigStorage';
import { LENGTH_LONG, sleep } from '../../commons/Constants';
import { data } from '../../commons/data';
import validateField from '../../commons/validator/Validator';
import AppBar from '../../components/AppBar';
import FormButton from '../../components/FormButton';
import { HttpException } from '../../http/errors/HttpException';
import HttpClient from '../../http/services/HttpClient';
import './AccountPage.css';

const AccountPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
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

  useEffect(() => {
    setLoaded(false);
    loadConfig();
  }, [history]);

  useEffect(() => {
    if (loaded) {
      setFirstName(data.account.firstName);
      setLastName(data.account.lastName);
      setEmail(data.account.email);
      setPhoneNumber(data.account.phone);
      setCountryCode(data.account.countryCode);
      setActive(data.account.active);
      setNotification(data.account.notifications);
      setUsername(data.account.username);
      setPassword(data.account.password);
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleAccount();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        setSnackMessage(`Download loading error: ${error.message}`);
        setShowSnack(true);
      });
  }

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
        setSnackMessage(`${JSON.stringify(AccountCreated)}`);
        setShowSnack(true);
      }
    } catch (error) {
      let err = error as HttpException;
      setSnackMessage(`${err.status}: Account failed`);
      setShowSnack(true);
    }

    await sleep();
    history.goBack();
  };

  /////// validations START
  const [firstNameError, setFirstNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  // const [countryCodeError, setCountryCodeError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [isTouchedFirstName, setIsTouchedFirstName] = useState(false);
  const [isTouchedLastName, setIsTouchedLastName] = useState(false);
  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isTouchedPhone, setIsTouchedPhone] = useState(false);
  const [isTouchedUsername, setIsTouchedUsername] = useState(false);
  const [isTouchedPass, setIsTouchedPass] = useState(false);

  const [formValid, setFormValid] = useState<Boolean>();

  useEffect(() => {
    if (usernameError || passwordError || emailError || phoneNumberError || firstNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, passwordError, emailError, phoneNumberError, firstNameError]);
  /////// END validations

  return (
    <>
      <AppBar title='Account' />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow >
            <IonCol size="12">

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedFirstName && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="First name"
                type="text"
                value={firstName}
                errorText={firstNameError}
                onIonChange={(e) => setFirstName(e.detail.value!.trim())}
                onIonInput={(e) => setFirstName(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedFirstName(true);
                  setFirstNameError(validateField("firstName", firstName))
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${isTouchedLastName && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Last name"
                type="text"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value?.trim() || '')}
                onIonBlur={(e) => {
                  setIsTouchedLastName(true)
                }}
              ></IonInput>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedEmail && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Email"
                type="email"
                value={email}
                errorText={emailError}
                onIonChange={(e) => setEmail(e.detail.value!.trim())}
                onIonInput={(e) => setEmail(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedEmail(true);
                  setEmailError(validateField("email", email))
                }}
              ></IonInput>


              <IonList style={{ marginLeft: -15, paddingLeft: 0, }}>
                <IonItem>
                  <IonSelect
                    justify='space-between'
                    aria-label="Phone-Country-Code"
                    interface="popover"
                    placeholder="Coutry Code"
                    value={countryCode}
                    onIonChange={(e) => setCountryCode(e.detail.value!.trim())}
                  >
                    <IonSelectOption value="+55">+55 BRA</IonSelectOption>
                    <IonSelectOption value="+1">+1 USA</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonInput
                className={`${formValid && 'ion-valid'} ${formValid === false && 'ion-invalid'} ${isTouchedPhone && 'ion-touched'}`}
                autoCorrect="off"
                placeholder="Phone Number"
                type="number"
                value={phoneNumber}
                errorText={phoneNumberError}
                onIonChange={(e) => setPhoneNumber(e.detail.value!.trim())}
                onIonInput={(e) => setPhoneNumber(e.detail.value!.trim())}
                onIonBlur={(event) => {
                  setIsTouchedPhone(true);
                  setPhoneNumberError(validateField("phoneNumber", phoneNumber))
                }}
              ></IonInput>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonCheckbox
                      labelPlacement="start"
                      color="success"
                      onIonChange={(e) => setActive(e.detail.checked)}
                      value={active}
                    >Active</IonCheckbox>
                  </IonCol>
                  <IonCol>
                    <IonToggle
                      labelPlacement="end"
                      color="success"
                      onIonChange={(e) => setNotification(e.detail.checked)}
                      checked={notification}
                    >Notification</IonToggle>
                  </IonCol>
                </IonRow>
              </IonGrid>

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
                  setUsernameError(validateField("username", username))
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
                  setPasswordError(validateField("password", password))
                }}
              ></IonInput>

              {/* <IonNavLink routerDirection="back" component={() => <Execution />}> */}
              <FormButton
                title="Save Account"
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


export default AccountPage;
