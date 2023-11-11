import { Capacitor } from '@capacitor/core';
import { IonContent, IonText } from "@ionic/react";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { RouteComponentProps } from "react-router";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_MEDIUM, sleep } from "../../commons/Constants";
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

  useEffect(() => {
    loadConfig();
    setIsPlaying(true);
  });

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
    var path = mediaFile.path;
    var ionicPath = Capacitor.convertFileSrc(path);

    setUrl(ionicPath);
  }, [mediaFile])

  const finsh = async () => {
    setSnackMessage(`Media Executed`);
    setShowSnack(true);
    await sleep();
    history.goBack();
  };

  return (
    <>
      <AppBar title='Media' backHref='/Execution' />
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
        autoHideDuration={LENGTH_MEDIUM}
        message={snackMessage}
      />
    </>
  );
};

export default MediaPage;
