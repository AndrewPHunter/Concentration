import React from 'react';
import uuidv4 from 'uuid/v4';
import storage from 'local-storage-fallback';
import gameEngine from './game.engine';


//shim localstorage if not available
if(!('localStorage' in window)) {
  window.localStorage = storage;
}

export const padTime = (number)=>(
  ("0" + number).slice(-2)
);

export const generateId =  ()=> uuidv4();

export const timeout = ms => new Promise(res=>setTimeout(res, ms));

//Standard React wrapper pattern to allow components to receive game and state via injected props
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

/* asynchronous wrappers for local storage*/
export const saveItem = (key, item)=>{
  return new Promise((resolve, reject)=>{
    try{
      localStorage.setItem(key, JSON.stringify(item));
      resolve();
    }
    catch(err){
      reject(err);
    }
  });
};

export const getItem = (key)=>{
  return new Promise((resolve, reject)=>{
    try{
      const item = JSON.parse(localStorage.getItem(key));
      resolve(item);
    }
    catch(err){
      reject(err);
    }
  });
};

export const deleteItem = (key)=>{
  return new Promise((resolve, reject)=>{
    try{
      localStorage.removeItem(key);
      resolve();
    }
    catch(err){
      reject(err);
    }
  });
};
