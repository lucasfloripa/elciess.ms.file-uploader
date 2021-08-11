export interface TokenAuthentication {
  auth: (token: string) => Promise<boolean>
}
