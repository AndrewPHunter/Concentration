import React from 'react';
import uuidv4 from 'uuid/v4';
import gameEngine from './game.engine';

export const padTime = (number)=>(
  ("0" + number).slice(-2)
);

export const generateId =  ()=> uuidv4();

export const timeout = ms => new Promise(res=>setTimeout(res, ms));

export const withGameEngine = (Component)=>class extends React.Component{

  state = {
    gameState: gameEngine.state,
    id: 0
  };

  componentDidMount = ()=>{
    const id = gameEngine.subscribe(this.handleChange);
    this.setState(()=>({
      id
    }));
  };

  componentWillUnmount = () =>{
    gameEngine.unsubscribe(this.state.id);
  };

  handleChange = (state)=>{
    this.setState(()=>({
      gameState: state
    }));
  };

  render(){
    return(
      <Component gameState={gameEngine.state} gameEngine={gameEngine} {...this.props}/>
    );
  }
};
