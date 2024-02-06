export class TError {
  errorKey: string;
  constraints: string[];
}

export class ResponseTemplate<TRes> {
  success: boolean;
  data: TRes;
  messageCode?: string;
  errors?: string[];

  constructor(data?: Partial<ResponseTemplate<TRes>>) {
    Object.assign(this, data);
  }
}

// export const convertDtoToResTemplateDto = <TRes>(dto: any) => {
//   class ResTemplateDto extends ResTemplate<TRes> {
//     @Type(() => dto)
//     data: TRes;
//   }

//   return ResTemplateDto;
// };
