import { IonNav, IonNavLink, IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import ConfigPAge from './pages/Config/ConfigPage';
import { Redirect, Route } from 'react-router';
import LoginPage from './pages/Login/LoginPage';
import Execution from './pages/Execution/Execution';
import { IonReactRouter } from '@ionic/react-router';
import AccountPage from './pages/Account/AccountPage';
import UploadPage from './pages/Upload/UploadPage';
import DownloadPage from './pages/Download/DownloadPage';
import MediaPage from './pages/Media/MediaPage';
import MediaPlayer from './pages/Media/MediaPlayer';

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
          <Route exact path="/MediaPlayer" component={MediaPlayer} />
        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </>
);

export default Main;