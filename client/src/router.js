import {Router, Stack, Scene} from 'react-native-router-flux';
import SignIn from './views/signIn';
import Start from './views/start';
import Login from './views/login';
import Logout from './views/logout';
import Index from './views/index';
import React, {PureComponent} from 'react';

import Home from './views/home';
const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="start" component={Start} title="Start" hideNavBar={false} />
      <Scene
        key="logout"
        component={Logout}
        title="Logout"
        hideNavBar={false}
      />
      <Scene key="signIn" component={SignIn} title="Sign In" />
      <Scene key="login" component={Login} title="Login" />
      <Scene key="index" component={Index} title="Index" />
      <Scene key="home" component={Home} />
    </Stack>
  </Router>
);
export default App;
