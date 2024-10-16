declare namespace NodeJS {
    export interface ProcessEnv {
        DB_HOST:string
        DB_PORT:string
        DB_NAME:string
        DB_USER:string
        DB_PASSWORD:string
        JWT_KEY:string
        JWT_REFRESH_TOKEN:string
    }
}