import { IonNav, IonNavLink, IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import Config from './pages/Config/Config';
import { Redirect, Route } from 'react-router';
import Login from './pages/Login/Login';
import Execution from './pages/Execution/Execution';
import { IonReactRouter } from '@ionic/react-router';

const Main: React.FC = () => (
  <>
    <IonNav root="Config"></IonNav>
    <IonReactRouter>
      <IonPage>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/Config" />} />
          <Route exact path="/Config" component={Config} />
          <Route exact path="/Execution" component={Execution} />
          <Route exact path="/Login" component={Login} />
        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </>
);

export default Main;