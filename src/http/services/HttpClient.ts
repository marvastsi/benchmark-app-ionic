import { Directory, Filesystem } from '@capacitor/filesystem';
import axios, { AxiosError, AxiosInstance } from "axios";
import { Buffer } from "buffer";
import { Account, AccountCreated } from "../../models/Account";
import { Credentials, Token } from "../../models/Credentials";
import { DownloadFile } from "../../models/DownloadFile";
import { FileUpload, FileUploadResponse } from "../../models/FileUpload";
import { HttpException } from "../errors/HttpException";

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class HttpClient {
    private api: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.api = axios.create({
            baseURL: baseUrl,
            headers: HEADERS
        });
    }

    public login = async (credentials: Credentials): Promise<Token> => {
        try {
            const response = await this.api.post(
                "/login",
                credentials,
                { headers: HEADERS }
            );
            return (response.data as Token);
        } catch (error) {
            throw this.handleException(error as Error, `Login Error: ${error}`);
        }
    }

    public saveAccount = async (account: Account): Promise<AccountCreated> => {
        try {
            const response = await this.api.post(
                "/accounts",
                account,
                { headers: HEADERS },
            );

            return (response.data as AccountCreated);
        } catch (error) {
            throw this.handleException(error as Error, "Account save Error");
        }
    }

    public upload = async (inputFile: FileUpload | any): Promise<FileUploadResponse> => {
        try {
            var formData = new FormData();
            formData.append("file", inputFile);

            const response = await this.api.post("/files/upload", formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            return (response.data as FileUploadResponse);
        } catch (error) {
            throw this.handleException(error as Error, "Upload Error");
        }
    }

    public download = async (fileName: string): Promise<DownloadFile> => {
        try {
            const response = await this.api.get(
                `/files/download/${fileName}`,
                {
                    headers: {
                        Accept: "*/*",
                    },
                    responseType: 'arraybuffer',
                },
            );

            const data = Buffer.from(response.data, "binary").toString("base64");

            const path = `Download/${fileName}`;
            await this.makeFile(path, data);

            return new DownloadFile(fileName, path);
        } catch (error) {
            throw this.handleException(error as Error, "Download Error");
        }
    }

    private makeFile = async (filePath: string, data: string) => {
        try {
            await Filesystem.writeFile({ path: filePath, data, directory: Directory.ExternalStorage });
        } catch (error) {
            console.log(error);
        }
    }

    private handleException = (error: Error, message: string): HttpException => {
        let exeption;
        if (error instanceof AxiosError) {
            exeption = { status: error.response!.status, message: error.message } as HttpException;
        } else {
            exeption = { ...error } as HttpException;
        }
        console.log(`${message}: ${JSON.stringify(exeption)}`);
        return exeption;
    }
}

export default HttpClient;
