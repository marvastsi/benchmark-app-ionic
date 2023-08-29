import { IonButton, IonContent, IonNavLink } from '@ionic/react';
import AppBar from '../../components/AppBar';
import Execution from '../Execution/Execution';
import './Config.css';
import FormButton from '../../components/FormButton';
import { sleep } from '../../commons/Constants';
import { useHistory } from 'react-router';
import { useState } from 'react';

const Config: React.FC = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [isTouched, setIsTouched] = useState(false);
  const [formValid, setFormValid] = useState<Boolean>(true);

  const handleSave = async () => {
    setSnackMessage(`Saved`);
    setShowSnack(true);
    // console.log(`User: ${username}, Pass: ${password}`);

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

    // await sleep();
    history.push('/Execution');
  };

  return (
    <>
      <AppBar title='Config' />
      <IonContent className="ion-padding">
        <h1>Config Page</h1>
        <p>Navigate to the next page Execution to see the back button.</p>
        <p>Navigate to the next page Execution to see the back button.</p>
        <p>Navigate to the next page Execution to see the back button.</p>
        <p>Navigate to the next page Execution to see the back button.</p>
        <p>Navigate to the next page Execution to see the back button.</p>
        <IonNavLink routerDirection="forward" component={() => <Execution />}>
          <FormButton
            title="Save Config"
            onPress={handleSave}
            disabled={!formValid}
          />
        </IonNavLink>
      </IonContent>
    </>
  );
};

export default Config;
