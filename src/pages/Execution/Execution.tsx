import { IonButton, IonContent, IonNav, IonNavLink, IonText, IonTitle, useIonRouter } from '@ionic/react';
import './Execution.css';
import AppBar from '../../components/AppBar';
import Login from '../Login/Login';
import Account from '../Account/Account';
import { useHistory } from 'react-router';

const Execution: React.FC = () => {
  const ionRouter = useIonRouter();
  
  return (
    <>
      <AppBar title='Green Benchmark' />
      <IonContent className="ion-padding">
          <IonTitle>Click the button to start.</IonTitle>
          {/* <IonNavLink routerDirection="forward" component={() => <Login />}> */}
          <IonButton
          onClick={(event) => {
            event.preventDefault();
            ionRouter.push("Account", "forward", "push");
          }}
          >Start</IonButton>
        {/* </IonNavLink> */}
      </IonContent>
    </>
  );
};

export default Execution;
