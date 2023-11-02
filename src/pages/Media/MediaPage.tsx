import { IonContent, IonText } from "@ionic/react";
import { Capacitor } from '@capacitor/core';
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { RouteComponentProps } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_LONG, sleep } from "../../commons/Constants";
import AppBar from "../../components/AppBar";
import { Config } from "../../models/Config";
import { MediaFile } from "../../models/MediaFile";
import "./MediaPage.css";

const MediaPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaFile, setMediaFile] = useState<MediaFile>({ name: "", path: "" });
  const [url, setUrl] = useState("");

  const finsh = async () => {
    await sleep();
    history.goBack();
  };

  const loadConfig = () => {
    retrieveConfig().then((config: Config) => {
      if (config && config.mediaFile) {
        setMediaFile(config.mediaFile);
      }
    }).catch((error) => {
      console.log(`Error: ${JSON.stringify(error)}`);
    });
  }

  useEffect(() => {
    loadConfig();
    setIsPlaying(true);
  });

  useEffect(() => {
    var path = mediaFile.path;
    var ionicPath = Capacitor.convertFileSrc(path);

    setUrl(ionicPath);
    setSnackMessage(ionicPath);
    setShowSnack(true);
  }, [mediaFile])

  return (
    <>
      <AppBar title='Media' />
      <IonContent className="ion-padding">
        <IonText>{mediaFile.name}</IonText>

        <ReactPlayer
          playing={isPlaying}
          width='100%'
          height='100%'
          controls
          url={url}
          playsinline
          onEnded={() => {
            finsh();
          }}
        />

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
