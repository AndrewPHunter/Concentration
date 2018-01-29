
/*
 * Clock class to provide timer functionality for the game
 */
class Clock{

  constructor(){

    this.state = {
      totalSeconds: 0,
      interval: null,
      callback: null
    };
  }

  //Starts timer and registers any callback functions
  start = (callback)=>{
    const interval = setInterval(this.updateTime, 1000);
    this.updateState(()=>({
      interval,
      callback: callback
    }));
  };

  //Clears timer interval
  stop = ()=>{
    clearInterval(this.state.interval);
    this.updateState(()=>({
      interval: null
    }));
  };

  //Resets internal tick count to 0
  reset = ()=>{
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    this.updateState(()=>({
      totalSeconds: 0,
      interval: null
    }));
  };

  //Updates internal tick count and calls registered callback
  updateTime = ()=>{
    this.updateState((prevState)=>({
      totalSeconds:prevState.totalSeconds + 1
    }));
    this.state.callback(this.state.totalSeconds)
  };

  //Utility function to update clock state immutably
  updateState = (predicate)=>{
    const clockState = this.state;
    this.state = {
      ...clockState,
      ...predicate(clockState)
    };
  }
}

export default Clock;
