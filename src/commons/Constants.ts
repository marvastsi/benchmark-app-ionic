export const LENGTH_SHORT = 2000;
export const LENGTH_MEDIUM = 3000;
export const LENGTH_LONG = 5000;

export const sleep = async (millis: number = LENGTH_SHORT) => {
    return new Promise((resolve) =>
        setTimeout(
            () => { resolve("result") },
            millis
        )
    );
};
