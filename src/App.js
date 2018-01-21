import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import NavigationButton from './components/navigation/navigation.button';
import Navigation from './components/navigation/navigation';
import Game from './components/game';
import './App.css';
import {withGameEngine} from "./components/game/game.utils";


class App extends Component {

  static propTypes = {
    gameEngine: PropTypes.object.isRequired
  };

  state = {
    navExpanded: false
  };

  onNavigationToggle = ()=>{
    this.props.gameEngine.pauseGame();
    this.setState((prevState)=>({
      navExpanded: !prevState.navExpanded
    }));
  };

  render(){
    const {navExpanded} = this.state;
    const navClass = navExpanded ? 'app__navview--expanded' : '';

    return(
      <BrowserRouter>
        <div className="app">
          <NavigationButton onClick={this.onNavigationToggle} close={navExpanded}/>
          <div className="app__gameview">
            <Switch>
              <Route exact path="/" component={Game}/>
            </Switch>
          </div>
          <div className={`app__navview ${navClass}`}>
            <Navigation expanded={navExpanded} onItemSelected={this.onNavigationToggle}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withGameEngine(App);
