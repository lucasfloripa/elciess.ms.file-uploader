export interface Authentication {
  auth: (accessToken: string) => Promise<boolean>
}
