class Clock{

  constructor(){

    this.state = {
      totalSeconds: 0,
      interval: null,
      callback: null
    };
  }

  start = (callback)=>{
    const interval = setInterval(this.updateTime, 1000);
    this.updateState(()=>({
      interval,
      callback: callback
    }));
  };

  stop = ()=>{
    clearInterval(this.state.interval);
    this.updateState(()=>({
      interval: null
    }));
  };

  reset = ()=>{
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    this.updateState(()=>({
      totalSeconds: 0,
      interval: null
    }));
  };

  updateTime = ()=>{
    this.updateState((prevState)=>({
      totalSeconds:prevState.totalSeconds + 1
    }));
    this.state.callback(this.state.totalSeconds)
  };

  updateState = (predicate)=>{
    const clockState = this.state;
    this.state = {
      ...clockState,
      ...predicate(clockState)
    };
  }
}

export default Clock;
