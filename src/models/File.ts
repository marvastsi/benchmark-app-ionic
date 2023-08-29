export interface File {
    uri: string;
    name?: string | null;
    copyError?: string;
    fileCopyUri?: string | null;
    type?: string | null;
    size?: number | null;
}
