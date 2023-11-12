import { IonButton, IonContent, IonTitle, withIonLifeCycle } from '@ionic/react';
import { Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { retrieveConfig } from '../../commons/ConfigStorage';
import { LENGTH_MEDIUM } from '../../commons/Constants';
import AppBar from '../../components/AppBar';
import { IExecution, ScenarioRoutes, TestExecution } from './Excecutions';
import './Execution.css';

const CONFIG_ROUTE = 'Config';

const Execution: React.FC<RouteComponentProps> = ({ history }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [buttonTitle, setButtonTitle] = useState("Start");
  const [showButton, setShowButton] = useState(true);
  const [label, setLabel] = useState("Click the button to Start");
  const [loaded, setLoaded] = useState(false);
  const [testExecution, setTestExecution] = useState<IExecution>(null);
  const [navigation, setNavigation] = useState({ route: CONFIG_ROUTE, direction: "back" });

  useEffect(() => {
    setLoaded(false);
    loadConfigs();
  }, [history]);

  const loadConfigs = () => {
    retrieveConfig()
      .then((config) => {
        const execution = TestExecution.getIstance(config)

        setTestExecution(execution);

        if (execution.hasNext()) {
          const routeName = ScenarioRoutes.get(execution.next());

          if (execution.isRunning()) {
            setLabel("Test Execution is Running");
          }
          setNavigation({ route: routeName, direction: "forward" });
        } else {
          setShowButton(false);
          setLabel("Test Execution Finished!");
          setButtonTitle("Reconfigure");
          execution.stop();
          setNavigation({ route: CONFIG_ROUTE, direction: "back" });
        }

        setLoaded(true);

      })
      .catch((error) => {
        console.error(`ExecutionScreen loading ERROR: ${error.message} => ${JSON.stringify(error)}`);
        setSnackMessage(`ExecutionScreen loading error: ${error.message}`);
        setShowSnack(true);
      });
  };

  const onStart = useCallback(() => {
    if (!testExecution.isRunning()) {
      testExecution.start();
    }
    history.push(navigation.route, navigation.direction);
  }, [navigation]);

  useEffect(() => {
    if (loaded && testExecution.isRunning()) {
      onStart();
    }
  }, [loaded, onStart])

  const StartButton = () => {
    return (
      <IonButton
        className='ion-text-center'
        style={executionStyles.formButton}
        onClick={onStart}
      >{buttonTitle}</IonButton>
    );
  };
  return (
    <>
      <AppBar title='Green Benchmark' />
      <IonContent className="ion-padding">
        <IonTitle className="ion-text-center" style={executionStyles.textStyle}>{label}</IonTitle>
        {showButton ? <StartButton /> : null}
      </IonContent>
      <Snackbar
        open={showSnack}
        autoHideDuration={LENGTH_MEDIUM}
        message={snackMessage}
      />
    </>
  );
};

export default withIonLifeCycle(Execution);

const executionStyles = {
  formButton: {
    borderRadius: 4,
    elevation: 6,
    height: 40,
    backgroundColor: "teal", //#009688,
    color: 'white',
    display: 'flex',
    margin: 'auto',
    width: '30%',
  },
  textStyle: {
    marginBottom: "50%",
    marginTop: "50%",

  },
}