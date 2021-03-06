import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withGameEngine} from "../game/game.utils";

class Audio extends Component{

  static propTypes = {
    gameState: PropTypes.object.isRequired,
    songs: PropTypes.array.isRequired
  };

  state = {
    current: Math.floor(Math.random() * this.props.songs.length)
  };

  componentDidUpdate = ()=>{
    const {paused, muted} = this.props.gameState;

    if(!paused && !muted){
      this.element.play();
    }
    else{
      this.element.pause();
    }
  };

  //add event handler to change tracks when song ends
  bindElement = (element)=>{
    this.element = element;
    if(this.element) {
      this.element.onended = this.changeTracks;
    }

  };

  //cycle through all the tracks present in the song array passed as a prop
  changeTracks = ()=>{
    this.setState((prevState)=>({
      current: (prevState.current + 1)%this.props.songs.length
    }), this.element.play());
  };

  render(){
    const {current} = this.state;
    const song = this.props.songs[current];

    return(
      <audio autoPlay ref={this.bindElement}>
        <source src={song} type='audio/mp3'/>
      </audio>
    );
  }
}

export default withGameEngine(Audio);
