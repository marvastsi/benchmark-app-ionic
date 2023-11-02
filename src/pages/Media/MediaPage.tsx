import { IonContent, IonText } from "@ionic/react";
// import { useFocusEffect } from "@react-navigation/native";
import { Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { LENGTH_LONG, sleep } from "../../commons/Constants";
import AppBar from "../../components/AppBar";
import "./MediaPage.css";
import ReactPlayer from "react-player";
import { MediaFile } from "../../models/MediaFile";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { Config } from "../../models/Config";
import { Capacitor } from '@capacitor/core';

const MediaPage: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  // const history = useHistory();
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [isPlaying, setIsPlaying] = useState(true);
  // const [isEnded, setIsEnded] = useState(false);
  const [mediaFile, setMediaFile] = useState<MediaFile>({ name: "", path: "" });
  const [url, setUrl] = useState("");
  // const videoRef = useRef<any>(null);

  const finsh = async () => {
    await sleep();
    history.goBack();
  };

  // useEffect(() => {
  //   if (isEnded) {
  //     videoRef.current.pause();
  //   }
  // }, [isEnded]);

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

        <IonText>Media Player</IonText>

        <ReactPlayer
          // ref={videoRef}
          playing={isPlaying}
          width='100%'
          height='100%'
          controls
          url={url}
          playsinline
          onEnded={() => {
            // setIsEnded(true);
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
