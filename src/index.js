import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Container, Menu } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import store from './store';
import DriverListPage from './components/pages/DriverListPage';
import DriverDetailPage from './components/pages/DriverDetailPage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename="/f1-frontend">
      <div>
        <Container>
          <Menu secondary pointing>
            <Menu.Item name="drivers" active={true} as={Link} to="/">
              Drivers list
            </Menu.Item>
          </Menu>
          <br />
        </Container>
        <Switch>
          <Route exact path="/" component={DriverListPage} />
          <Route path="/drivers/page/:page_num" component={DriverListPage} />
          <Route path="/drivers/:driver_id" component={DriverDetailPage} />
          <Route path="/drivers/:driver_id/page/:page_num" component={DriverDetailPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
