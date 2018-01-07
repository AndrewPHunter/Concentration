import React, { Component } from 'react';
import ICONS from './components/icon/icons.constants';
import Icon from './components/icon/icon';

class App extends Component {

  render(){
    return(
      <Icon icon={ICONS.ANDROID} width={100} height={100}/>
    );
  }
}

export default App;
