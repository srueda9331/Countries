import './App.css';
import { BrowserRouter, Route, Switch }  from 'react-router-dom'
import Landing from './components/LandingPage';
import Home from './components/Home';
import CreateActivity from './components/CreateActivity';
import CountryDetail from './components/CountryDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/home/:id' component={CountryDetail} />
          <Route path='/home' component={Home} />
          <Route path='/activity' component={CreateActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
