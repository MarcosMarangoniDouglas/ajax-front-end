
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Home from './components/home';
import Header from './components/header';
import AddNew from './components/add';
import Edit_Delete from './components/edit_delete';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute exact path="/new" component={AddNew} />
        <PublicRoute exact path="/actions" component={Edit_Delete} />
      </Switch>
    </Router>
  );
}

function PublicRoute({ component, ...rest }) {
  return (
    <Route {...rest}>
      <PublicComponentsRender component={component} {...rest} />
    </Route>
  );
}

const PublicComponentsRender = (props) => {
  return (
    <React.Fragment>
      <div>
        <Header />
      </div>
      <div className="h-75" style={{ backgroundImage: `url(/background.jpg)`, padding: '15px' }}>
        <props.component params={useParams()} location={props.location} />
      </div>
    </React.Fragment>
  );
}

export default App;
