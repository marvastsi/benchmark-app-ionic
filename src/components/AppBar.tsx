import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';
import Snackbar from '@mui/material/Snackbar';

import './AppBar.css';
import { LENGTH_MEDIUM } from '../commons/Constants';

export type AppBarProps = {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = (props: AppBarProps) => {
  const [open, setOpen] = React.useState(false);
  const handleMenuClick = () => {
    setOpen(true);
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{props.title || ''}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleMenuClick}>
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Snackbar
        open={open}
        autoHideDuration={LENGTH_MEDIUM}
        message="Implement this"
      />
    </>
  );
}

export default AppBar;