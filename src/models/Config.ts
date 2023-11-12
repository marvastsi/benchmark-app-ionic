import { FileUpload } from "./FileUpload";
import { MediaFile } from "./MediaFile";

export type Config = {
    testLoad: number;
    mediaFile: MediaFile;
    uploadFile: FileUpload;
    downloadFile: string;
    serverUrl: string
    specificScenario: number;
}
