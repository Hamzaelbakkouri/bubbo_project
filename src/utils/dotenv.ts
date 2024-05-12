import dotenv from "dotenv";

// Your web app's Firebase configuration
dotenv.config();

const getDotenv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined || value === null) {
        console.log(
            "---------------- Environment variable undefined or null -------------------"
        );

        console.log(`Environment variable "${key}" is undefined or null`);

        console.log(
            "----------------------------------------------------------------------------"
        );
        // throw error 
        throw new Error(`key is undefined or null`);
    }
    return value;
};

export default getDotenv;
