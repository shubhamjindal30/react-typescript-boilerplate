import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import Routes from './routes/routes';
import { theme } from './styles/mui-theme';
import store from './redux';
import './firebase/index';

const App: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME ?? 'React App';
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
