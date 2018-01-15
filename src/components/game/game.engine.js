import {CARD_ICONS} from '../icon/icons.constants';
import {generateId} from './game.utils';

class Game {

  state = Game.newGameState();

  listeners = {};

  static shuffleDeck = (deck)=>{
    let currentIndex = deck.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    return deck;
  };

  static newGameState = ()=>({
    cards: [],
    selected: [],
    timeStart: null,
    timerInterval: null,
    time: 0,
    moves: 0,
    matches: 0,
    endgame: false,
    rating: 3,
    totalRating: 3
  });

  newGame = ()=>{
    this.updateGameState(()=>({
      ...Game.newGameState(),
      timeStart: new Date().getTime(),
      cards: this.generateDeck(),
    }));
    this.startTimer();
  };

  flipAllCards = ()=>{
    const {cards} = this.state;
    const flipped = cards.forEach(card=>card.isFlipped = false);
    this.updateGameState(()=>({
      cards: flipped
    }));
  };

  startTimer = ()=>{
    const timerInterval = setInterval(this.updateTimer, 1000);
    this.updateGameState(()=>({
      timerInterval
    }));
  };

  updateTimer = ()=>{
    this.updateGameState((prevState)=>({
      time: new Date().getTime() - prevState.timeStart
    }));
  };

  generateDeck = ()=>{

    const makeCards = ()=>(Object.keys(CARD_ICONS).map(key=>({
      icon: CARD_ICONS[key],
      name: key,
      isFlipped: false,
      matched: false
    })));

    return Game.shuffleDeck([...makeCards(), ...makeCards()]);

  };

  cardSelected = (index)=>{

    //If two cards are selected we cannot select a third card
    //Only used for transitory situation to avoid race condition
    console.log(this.state.selected.length);

    if(!(this.state.selected.length < 2)){
      return;
    }

    console.log(this.state.selected.length);
    const cards = [...this.state.cards];
    cards[index].isFlipped = true;

    this.updateGameState((prevState)=>({
      cards,
      selected: [...prevState.selected, cards[index]],
      moves: prevState.moves + 1
    }));

  };

  checkMatch = ()=> this.state.selected.length === 2 && (this.state.selected[0].name === this.state.selected[1].name);

  updateGameState = (predicate)=>{
    const gameState = this.state;

    this.state = {
      ...gameState,
      ...predicate(gameState)
    };

    Object.keys(this.listeners).forEach(key=>this.listeners[key](this.state));
  };

  subscribe = (listener)=>{
    const id = generateId();
    this.listeners[id] = listener;
    return id;
  };

  unsubscribe = (id)=>{
    delete this.listeners[id];
  };
}

const game = new Game();
export default game;
