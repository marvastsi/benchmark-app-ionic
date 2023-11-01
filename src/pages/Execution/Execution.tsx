import { IonButton, IonContent, IonItem, IonNav, IonNavLink, IonText, IonTitle, useIonRouter } from '@ionic/react';
import './Execution.css';
import AppBar from '../../components/AppBar';
import Login from '../Login/LoginPage';
import Account from '../Account/AccountPage';
import { useHistory } from 'react-router';

const Execution = () => {
  const ionRouter = useIonRouter();

  return (
    <>
      <AppBar title='Green Benchmark' />
      <IonContent className="ion-padding">
        <IonTitle>Click the button to start.</IonTitle>
        {/* <IonNavLink routerDirection="forward" component={() => <Login />}> */}
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("Login", "forward", "push");
            }}
          >Login</IonButton>
          {/* </IonNavLink> */}
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("Account", "forward", "push");
            }}
          >Account</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("Download", "forward", "push");
            }}
          >Download</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("Upload", "forward", "push");
            }}
          >Upload</IonButton>
        </IonItem>
        <IonItem>
        <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("Media", "forward", "push");
            }}
          >Media</IonButton>
        </IonItem>
        <IonItem>
        <IonButton
            onClick={(event) => {
              event.preventDefault();
              ionRouter.push("MediaPlayer", "forward", "push");
            }}
          >Media Player</IonButton>
        </IonItem>
      </IonContent>
    </>
  );
};

export default Execution;
