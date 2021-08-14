export interface Decrypter {
  decrypt: (accessToken: string) => Promise<boolean>
}
