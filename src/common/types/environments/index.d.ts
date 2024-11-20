declare namespace NodeJS{
    export interface ProcessEnv{
        PORT: number;
        DB_HOST: string;
        DB_PORT: number;
        POSTGRES_DB: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        JWT_SECRET: string;
    }
}