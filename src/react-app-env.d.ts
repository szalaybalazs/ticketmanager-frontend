/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    REACT_APP_SERVER_ENDPOINT: string
    REACT_APP_API_KEY: string
    REACT_APP_TITLE: string
  }
}