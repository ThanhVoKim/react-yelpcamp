import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import IndexCampgrounds from './pages/IndexCampgrounds';
import ShowCampground from './pages/ShowCampground';
import AddNewCampground from './pages/AddNewCampground';
import EditCampground from './pages/EditCampground';
import AddNewComment from './pages/AddNewComment';
import EditComment from './pages/EditComment';
import requireLogin from './pages/HOCs/requireLogin';
import requireAuthCampground from './pages/HOCs/requireAuthCampground';
import requireAuthComment from './pages/HOCs/requireAuthComment';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Header>
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/campgrounds" component={IndexCampgrounds} exact />
          <Route path="/campgrounds/pages/:pageid" component={IndexCampgrounds} />
          <Route path="/campgrounds/new" component={requireLogin(AddNewCampground)} exact />
          <Route path="/campgrounds/:id" component={ShowCampground} exact />
          <Route path="/campgrounds/:id/edit" component={requireAuthCampground(EditCampground)} exact />
          <Route path="/campgrounds/:id/comment/new" component={requireLogin(AddNewComment)} exact />
          <Route path="/campgrounds/:id/comment/:commentid/edit" component={requireAuthComment(EditComment)} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </Header>
    </Switch>
  </Router>
);

export default AppRouter;
