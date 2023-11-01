import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from "react-router";
import { sleep } from '../../commons/Constants';
import { useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import "./MediaPlayer.css";

type VideoPlayerProps = {
  isPlaying: boolean;
  src: string | any;
};

const MediaPlayer: React.FC<RouteComponentProps> = ({/*location,*/ history }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);

  const finsh = async () => {
    await sleep();
    history.goBack();
  };

  const VideoPlayer = ({ src, isPlaying }: VideoPlayerProps) => {
    const videoRef = useRef<any>(null);

    useEffect(() => {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }, [isPlaying]);
    
    // useIonViewDidEnter( async () => {
    //   videoRef.current.play();
    // });

    // useIonViewWillEnter( async () => {
    //   videoRef.current.play();
    // });

    useEffect(() => {
      if (isEnded) {
        videoRef.current.pause();
      }
    }, [isEnded]);

    return <video style={{width: '100%'}} ref={videoRef} src={src} controls controlsList='play timeline volume' autoPlay
      onEnded={(e) => {
        setIsEnded(true);
        finsh();
      }}
    />;
  }

  return (
    <>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}

export default MediaPlayer;
