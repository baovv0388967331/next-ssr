import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';

//TODO
export const convertInstanceToPlain = <T>(values: T) => {
  return instanceToPlain(values, { excludeExtraneousValues: true });
};

export const convertPlainToInstance = <T>(dto: ClassConstructor<T>, values: T) => {
  return plainToInstance(dto, values, {
    strategy: 'excludeAll',
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
    enableImplicitConversion: true,
  });
};
