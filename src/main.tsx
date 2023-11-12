import { IonNav, IonPage, IonRouterOutlet, withIonLifeCycle } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router';
import AccountPage from './pages/Account/AccountPage';
import ConfigPAge from './pages/Config/ConfigPage';
import DownloadPage from './pages/Download/DownloadPage';
import Execution from './pages/Execution/Execution';
import LoginPage from './pages/Login/LoginPage';
import MediaPage from './pages/Media/MediaPage';
import UploadPage from './pages/Upload/UploadPage';

const Main: React.FC = () => (
  <>
    <IonNav root="Config"></IonNav>
    <IonReactRouter>
      <IonPage>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/Config" />} />
          <Route exact path="/Config" component={ConfigPAge} />
          <Route exact path="/Execution" component={Execution} />
          <Route exact path="/Login" component={LoginPage} />
          <Route exact path="/Account" component={AccountPage} />
          <Route exact path="/Upload" component={UploadPage} />
          <Route exact path="/Download" component={DownloadPage} />
          <Route exact path="/Media" component={MediaPage} />
        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </>
);

export default withIonLifeCycle(Main);