import { IonButton, IonContent, IonItem, IonTitle, useIonRouter, withIonLifeCycle } from '@ionic/react';
import AppBar from '../../components/AppBar';
import './Execution.css';

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
      </IonContent>
    </>
  );
};

export default withIonLifeCycle(Execution);
