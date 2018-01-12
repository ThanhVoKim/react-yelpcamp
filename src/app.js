import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './firebase/firebase';
import './styles/styles.scss';
import AppRouter, { history } from './AppRouter';
import configureStore from './store/configureStore';
import { fetchCampgrounds } from './actions/indexAction';
import LoadingPage from './pages/LoadingPage';

const store = configureStore();

const fetchData = async () => {
  await store.dispatch(fetchCampgrounds());
};

const token = localStorage.getItem('firebase:authUser:AIzaSyDv_p41BBFlWdFcQutYQfNFH33xf3ITnPA:[DEFAULT]');
if (token) {
  const data = JSON.parse(token);
  store.dispatch({
    type: 'USER_LOGIN',
    user: {
      uid: data.uid,
      displayName: data.displayName,
      avatar: data.photoURL
    }
  });
}
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

fetchData().then(() => {
  const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
