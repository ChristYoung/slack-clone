'use client';

import { Provider } from 'jotai';

export interface JotaiProviderProps {
  children: React.ReactNode;
}

export const JotaiProvider: React.FC<JotaiProviderProps> = (props: JotaiProviderProps) => {
  return <Provider>{props.children}</Provider>;
};
