import { Translate } from 'next-translate';
import * as Yup from 'yup';

import { AuthFormDto } from './declare';

export function getValidateSchema(t: Translate) {
  return Yup.object().shape<Partial<Record<keyof AuthFormDto, Yup.AnySchema>>>({
    email: Yup.string().required(t('Email is required')),
    password: Yup.string().required('First name is required'),
  });
}
