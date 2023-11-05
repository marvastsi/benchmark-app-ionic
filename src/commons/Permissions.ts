import { Filesystem } from "@capacitor/filesystem";

const requestPermission = async () => {
    try {
        let permission = await Filesystem.checkPermissions();

        if (permission.publicStorage !== "granted") {

            permission = await Filesystem.requestPermissions();

            if (permission.publicStorage !== "granted") {
                return
            }
        }
    } catch (err) {
        console.error("ERROR: " + err);
        throw err
    }
};

export default requestPermission;
