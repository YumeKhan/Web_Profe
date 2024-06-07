import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ClassesPage from './pages/ClassesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentPage from './pages/StudentPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/classes" component={ClassesPage} />
        <Route path="/student/:id" component={StudentPage} />
      </Switch>
    </Router>
  );
}

export default App;
