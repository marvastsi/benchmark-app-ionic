import { IonButton, IonContent, IonItem, IonTitle, withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import AppBar from '../../components/AppBar';
import './Execution.css';

const Execution: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  return (
    <>
      <AppBar title='Green Benchmark' />
      <IonContent className="ion-padding">
        <IonTitle>Click the button to start.</IonTitle>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              history.push("Login", "forward");
            }}
          >Login</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              history.push("Account", "forward");
            }}
          >Account</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              history.push("Download", "forward");
            }}
          >Download</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              history.push("Upload", "forward");
            }}
          >Upload</IonButton>
        </IonItem>
        <IonItem>
          <IonButton
            onClick={(event) => {
              event.preventDefault();
              history.push("Media", "forward");
            }}
          >Media</IonButton>
        </IonItem>
      </IonContent>
    </>
  );
};

export default withIonLifeCycle(Execution);
