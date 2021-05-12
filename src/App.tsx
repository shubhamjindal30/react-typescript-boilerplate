import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

import Routes from './routes/routes';
import { theme } from './styles/mui-theme';

const App: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME ?? 'React App';
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
