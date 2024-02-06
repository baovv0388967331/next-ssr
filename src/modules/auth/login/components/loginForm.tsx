'use client';

import { Card } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { ButtonLoading } from '@/components/button';
import { Form } from '@/components/form';
import { useForm } from '@/hooks/useForm';

import { Loading, LoginFormDto } from '../declare';
import { getValidateSchema } from '../validate';

type Props = {
  onLogin: (value: LoginFormDto) => void;
};

export const LoginFormComponent = ({ onLogin }: Props) => {
  const { t } = useTranslation('auth_login');

  const { control, handleSubmit } = useForm<LoginFormDto>({
    defaultValues: new LoginFormDto({}),
    schema: getValidateSchema(t),
  });

  return (
    <Card>
      <Form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4 items-center">
        <Form.Control
          name="email"
          control={control}
          render={(field) => (
            <Form.Layout label={{ title: t('email'), className: 'w-24', required: true }}>
              <Form.Input variant="outlined" className="w-72" {...field} />
            </Form.Layout>
          )}
        />

        <Form.Control
          name="password"
          control={control}
          render={(field) => (
            <Form.Layout label={{ title: t('password'), className: 'w-24', required: true }}>
              <Form.Input variant="outlined" className="w-72" {...field} />
            </Form.Layout>
          )}
        />

        <ButtonLoading htmlType="submit" className="w-32" loading={Loading.submit}>
          On submit
        </ButtonLoading>
      </Form>
    </Card>
  );
};
