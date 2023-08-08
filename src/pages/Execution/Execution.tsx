import { IonButton, IonContent, IonText, IonTitle } from '@ionic/react';
import './Execution.css';
import AppBar from '../../components/AppBar';

const Execution: React.FC = () => {
  return (
    <>
      <AppBar title='Green Benchmark' />
      <IonContent className="ion-padding">
          <IonTitle>Click the button to start.</IonTitle>
          <IonButton>Start</IonButton>
      </IonContent>
    </>
  );
};

export default Execution;
