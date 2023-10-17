import { IonButton, IonSpinner } from '@ionic/react';
import { useState } from 'react';

type ButtonProps = {
    onPress: any;
    title: string;
    disabled?: boolean | undefined;
}

const FormButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { onPress, title, disabled } = props;
    const [loading, setLoading] = useState(false);
    return (
        <div style={{ marginTop: 50 }}>
            {(
                <IonSpinner
                    style={(loading) ? styles.spinnerShow : styles.spinnerHide}>
                </IonSpinner>
            )}
            <IonButton
                expand="block"
                disabled={disabled}
                style={(loading) ? styles.buttonLoading : styles.button}
                onClick={async (event) => {
                    setLoading(true);
                    await onPress(event);
                    setLoading(false);
                }}
            >{title}</IonButton>
        </div>
    );
}

const styles = {
    button: {
        marginLeft: 48,
        marginRight: 48,
        borderRadius: 4,
        elevation: 6,
        height: 40,
        backgroundColor: "teal",
        zIndex: 0,
        opacity: 1,
    },
    buttonLoading: {
        marginLeft: 48,
        marginRight: 48,
        borderRadius: 4,
        elevation: 6,
        height: 40,
        backgroundColor: "teal",
        zIndex: 0,
        opacity: 0.6,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "500",
        letterSpacing: 0.30,
        textTransform: "capitalize",
        color: "white",
    },
    spinnerShow: {
        zIndex: 1,
        display: "block",
        margin: "auto",
        color: "teal",
    },
    spinnerHide: {
        display: "none",
    },
}

export default FormButton;