import logo from './logo.svg';
import './assets/css/app.css';
import { Provider } from 'react-redux';
import store from './reducer/store';
import Header from './components/header';
import Card from './components/card';

function App() {
  return (
    <>
    <Provider store={store}>
        <Header/>
        <Card/>
        </Provider>
        </>
  );
}

export default App;
