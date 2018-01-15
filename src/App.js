import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Game from './components/game';
import './App.css';


class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Game}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
