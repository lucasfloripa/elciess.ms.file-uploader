export interface Authentication {
  auth: (data: any) => Promise<boolean>
}
