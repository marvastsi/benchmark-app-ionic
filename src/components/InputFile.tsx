import { FilePicker, PickFilesResult } from '@capawesome/capacitor-file-picker';
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonRow } from '@ionic/react';
import { folder } from 'ionicons/icons';
import { Dispatch, HTMLAttributes, useCallback } from 'react';
import { File } from "../models/File";


export interface InputFileProps extends HTMLAttributes<HTMLIonInputElement> {
  fileTypes?: string[] | undefined
  setFile: Dispatch<File>;
  value?: string | number | null;
}

const InputFile = (props: InputFileProps) => {
  const { value, fileTypes, setFile } = props;

  const logFilePicked = (res: PickFilesResult) => {
    console.log("res : " + JSON.stringify(res));
  };

  const onSelectFile = useCallback(async () => {
    try {
      const result = await FilePicker.pickFiles({
        types: fileTypes,
        multiple: false,
      });
      logFilePicked(result);

      setFile({ ...result.files[0] });

    } catch (err) {
      console.log("Unknown Error: ", JSON.stringify(err));
      throw err;
    }
  }, [setFile]);

  return (
    <IonGrid style={styles.fileInputView} >
      <IonRow>
        <IonCol size="12" style={styles.columnView}>
          <IonGrid style={styles.fileInputView}>
            <IonRow>
              <IonCol size='10' style={styles.fileInputView}>
                <IonInput
                  {...props as HTMLAttributes<HTMLIonInputElement>}
                  style={styles.textInput}
                  value={value}
                  autoCorrect="off"
                  type="url"
                  readonly={true}
                ></IonInput>
              </IonCol>
              <IonCol size='2' >
                <IonButton
                  style={styles.iconButton}
                  onClick={onSelectFile}
                >
                  <IonIcon slot="icon-only" icon={folder}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default InputFile;

const styles = {
  fileInputView: {
    margin: 0,
    padding: 0,
  },
  columnView: {
    marginLeft: 0,
    padding: 0,
    marginTop: 1,
    marginBottom: 1,
  },
  textInput: {
    height: 46,
  },
  iconButton: {
    width: '100%',
    backgroundColor: "teal",
    borderRadius: 4,
  },
}