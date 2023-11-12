import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import Snackbar from '@mui/material/Snackbar';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import React from 'react';

import { LENGTH_MEDIUM } from '../commons/Constants';
import './AppBar.css';

export type AppBarProps = {
  title?: string;
  backHref?: string;
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
            <IonBackButton
              mode='md'
              defaultHref={props.backHref}
            ></IonBackButton>
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