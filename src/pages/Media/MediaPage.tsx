import { IonContent, IonText } from "@ionic/react";
// import { useFocusEffect } from "@react-navigation/native";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { LENGTH_LONG } from "../../commons/Constants";
import AppBar from "../../components/AppBar";
import "./MediaPage.css";

const MediaPage = () => {
  const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");


  return (
    <>
      <AppBar title='Media' />
      <IonContent className="ion-padding">
        <IonText>Media Player</IonText>
        
      </IonContent>
      <Snackbar
        open={showSnack}
        autoHideDuration={LENGTH_LONG}
        message={snackMessage}
      />
    </>
  );
};

export default MediaPage;
