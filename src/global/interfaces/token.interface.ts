export interface Token {
  _id: string
  name: string
  email: string
  role: string
  iat?: string
  exp?: string
}
