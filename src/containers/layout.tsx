import { ReactNode } from 'react';

import { LAYOUT_TYPE } from '@/constants';

type Props = {
  children: ReactNode;
  layoutType?: LAYOUT_TYPE;
};

const PublicWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
const PrivateWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const LayoutContainer = ({ children, layoutType }: Props) => {
  if (layoutType === LAYOUT_TYPE.PRIVATE) {
    return <PrivateWrapper>{children}</PrivateWrapper>;
  }

  if (layoutType == LAYOUT_TYPE.PUBLIC) {
    return <PublicWrapper>{children}</PublicWrapper>;
  }

  return <>{children}</>;
};

export default LayoutContainer;
