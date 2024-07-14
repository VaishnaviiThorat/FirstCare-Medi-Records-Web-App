import { createConnection } from "mysql";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../constants/DbConstants.js";

export const connection = createConnection(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
)