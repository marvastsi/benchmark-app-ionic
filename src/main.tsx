import { IonNav } from '@ionic/react';
import React from 'react';
import Config from './pages/Config/Config';

const Main: React.FC = () => (
  <IonNav root={() => <Config />}></IonNav>
);

export default Main;