import React, { useEffect } from 'react';
import Routes from './routes/routes';

const App: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME ?? 'React App';
  }, []);
  return <Routes />;
};

export default App;
