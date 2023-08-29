export type Account = {
    firstName: string;
    lastName?: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    active: boolean;
    notification: boolean;
    username: string;
    password: string;
}

export type AccountCreated = {
    accountId: string;
}
