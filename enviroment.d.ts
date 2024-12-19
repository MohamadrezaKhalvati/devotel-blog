export interface Env {
    APP_PORT: string
    NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION'
    APP_PORT: string
    POSTGRES_USER: string
    POSTGRES_DB: string
    POSTGRES_PASSWORD: string
    POSTGRES_PORT: string
    POSTGRES_HOST: string
    APP_URL: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export {}
