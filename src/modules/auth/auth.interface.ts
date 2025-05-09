export interface User {
  _id: string
  email: string
  token: string
  name: string
  role: 'admin' | 'external'
}
