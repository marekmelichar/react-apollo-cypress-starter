import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/404/NotFoundPage';
import { Header, CustomSnackBar } from './components';
import { locales, TLocale } from './i18n';
import './App.css';
import theme from './theme';
import { snackbarMessageVar } from './cache';

declare global {
  // tslint:disable-next-line
  interface Window {
    REACT_APP_ROUTE_HOME: string;
    REACT_APP_ROUTE_ALL_CUSTOMERS: string;
  }
}

const routes = {
  HomePage: window.REACT_APP_ROUTE_HOME,
  AllCustomersPage: window.REACT_APP_ROUTE_ALL_CUSTOMERS,
};

const App: React.FC = () => {
  const snackbarMessage = useReactiveVar(snackbarMessageVar);
  const currentLocale: TLocale = 'cs';

  return (
    <BrowserRouter>
      <IntlProvider locale={currentLocale} messages={locales[currentLocale]} defaultLocale="cs">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route exact path={routes.HomePage} component={HomePage} />
            <Route
              exact
              path={routes.AllCustomersPage}
              component={() => <div>AllCustomersPage</div>}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          {snackbarMessage.error && (
            <CustomSnackBar
              message={snackbarMessage}
              severityIndex={0}
              locationName={snackbarMessage.locationName}
            />
          )}
          {snackbarMessage.success && (
            <CustomSnackBar
              message={snackbarMessage}
              severityIndex={1}
              locationName={snackbarMessage.locationName}
            />
          )}
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
