export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly IKSM_SESSION: string;
      readonly SPLATNET_API_URL: string;
      readonly USER_AGENT: string;
    }
  }
}
