import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import { theme } from '../styles/mui-theme';
import store from '../redux';

const render = (ui: React.ReactElement, options?: RenderOptions): RenderResult => {
  const Wrapper: React.FunctionComponent = ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { render };
