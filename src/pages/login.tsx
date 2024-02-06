'use client';

import { LAYOUT_TYPE } from '@/constants';
import { Index } from '@/modules/auth/login';

import { NextComponentWithLayout } from './_app';

const LoginPage: NextComponentWithLayout = () => {
  return <Index />;
};

LoginPage.layoutType = LAYOUT_TYPE.PUBLIC;

export default LoginPage;
