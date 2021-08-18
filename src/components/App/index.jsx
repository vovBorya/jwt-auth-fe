import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";
import Container from '@material-ui/core/Container';

import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFound";

import authProvider from "../../api/authProvider";

import './App.scss';

function App() {

    const history = useHistory();

    const [isAuthorized, setIsAuthorized] = useState();

    useEffect(() => {
        const isAuthorized = authProvider.isAuthorized()
        setIsAuthorized(isAuthorized);

        console.log({isAuthorized});

        if (isAuthorized) {
            history.push("/home");
        } else {
            history.push("/sign-in");
        }
    }, [history]);

    const handleLogoutClick = async () => {
        setIsAuthorized(false);
        await authProvider.logout();
    }

  return (
      <Router>
          <div className="App">
              {isAuthorized && (
                  <a
                      onClick={handleLogoutClick}
                      href="/sign-in"
                      className="logout-btn"
                  >
                      Logout
                  </a>
              )}
              <Container maxWidth="sm">
                  <Switch>
                      <Route exact path="/">
                          <Redirect to="/home" />
                      </Route>
                      <Route path="/sign-in">
                          <SignIn {...{setIsAuthorized}} />
                      </Route>
                      <Route path="/sign-up">
                          <SignUp {...{setIsAuthorized}} />
                      </Route>
                      <Route path="/home">
                          <Home />
                      </Route>
                      <Route path="/404" component={NotFoundPage} />
                      <Redirect to="/404" />
                  </Switch>
              </Container>
          </div>
      </Router>
  );
}

export default App;
