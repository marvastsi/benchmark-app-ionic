import { IonButton, IonContent, IonNavLink } from '@ionic/react';
import AppBar from '../../components/AppBar';
import Execution from '../Execution/Execution';
import './Config.css';

const Config: React.FC = () => {
  return (
    <>
      <AppBar title='Config'/>
      <IonContent className="ion-padding">
        <h1>Config Page</h1>
        <p>Navigate to the next page Execution to see the back button.</p>
        <IonNavLink routerDirection="forward" component={() => <Execution />}>
          <IonButton>Save Config</IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
};

export default Config;
