export enum Loading {
  submit = 'submit-loading',
}

export class LoginFormDto {
  email: string = '';
  password: string = '';

  constructor(data: Partial<LoginFormDto>) {
    Object.assign(this, data);
  }
}
