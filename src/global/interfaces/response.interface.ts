import { HttpStatus } from '@nestjs/common'

interface BaseResponse {
  message: string
  statusCode: HttpStatus
}

interface Success<T> {
  payload: T
  status: 'success'
}

export type ApiResponse<T> = BaseResponse & Success<T>
