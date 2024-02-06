import { Expose } from 'class-transformer';

export class AuthLoginReqDto {
  @Expose({ name: 'mailAddress' })
  email: string;

  @Expose()
  password: string;

  constructor(data?: Partial<AuthLoginReqDto>) {
    Object.assign(this, data);
  }
}
