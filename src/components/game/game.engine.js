import {CARD_ICONS} from '../icon/icons.constants';
import {generateId, timeout, padTime, saveItem, getItem, deleteItem} from './game.utils';
import Clock from './game.clock';

class Game {

  state = Game.newGameState();

  listeners = {};

  static DECK_SIZE = Object.keys(CARD_ICONS) * 2;

  static TOTAL_STAR_RATING = 3;

  static STORAGE_KEYS = {
    LEADERBOARD: 'LEADERBOARD'
  };

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
    gameClock: new Clock(),
    time: '',
    moves: 0,
    matches: 0,
    rating: 3,
    totalRating: Game.TOTAL_STAR_RATING,
    paused: true,
    muted: false,
    inProgress: false
  });

  newGame = ()=>{
    this.state.gameClock && this.state.gameClock.stop();
    this.updateGameState(()=>({
      ...Game.newGameState(),
      cards: this.generateDeck(),
      inProgress:true
    }));
  };

  pauseGame = ()=>{
    this.state.gameClock.stop();
    this.updateGameState(()=>({
      paused: true
    }));
  };

  toggleSound = ()=>{
    this.updateGameState((prevState)=>({
      muted: !prevState.muted
    }));
  };

  resumeGame = ()=>{
    this.state.gameClock.start(this.timerUpdate);
    this.updateGameState(()=>({
      paused: false
    }));
  };

  timerUpdate = (totalSeconds)=>{

    this.updateGameState(()=>({
      time: `${padTime(Math.floor(totalSeconds/60))} : ${padTime(totalSeconds - Math.floor(totalSeconds/60) * 60)}`
    }));

  };

  flipAllCards = ()=>{
    const {cards} = this.state;
    const flipped = cards.map(card=>({
      ...card,
      isFlipped: false
    }));
    this.updateGameState(()=>({
      cards: flipped
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

  cardSelected = async (index)=>{

    //If two cards are selected we cannot select a third card
    //Only used for transitory situation to avoid race condition

    if(!(this.state.selected.length < 2)){
      return;
    }

    const cards = [...this.state.cards];
    cards[index].isFlipped = true;

    this.updateGameState((prevState)=>({
      cards,
      selected: [...prevState.selected, cards[index]]
    }));


    if(this.state.selected.length===2){

      const cards = [...this.state.cards];

      //HACK: Allow for card animation
      await timeout(800);

      if(this.checkMatch()){

        const deck = cards.map(card=>({
          ...card,
          matched: card.matched || card.name === this.state.selected[0].name || card.name === this.state.selected[1].name
        }));

        this.updateGameState((prevState)=>({
          cards: deck,
          selected: [],
          matches: prevState.matches + 1,
          moves: prevState.moves + 1,
          rating: this.calculateRating(prevState.moves + 1)
        }));
      }
      else{

        const deck = cards.map(card=>({
          ...card,
          isFlipped: card.matched
        }));

        this.updateGameState((prevState)=>({
          cards: deck,
          selected: [],
          moves: prevState.moves + 1,
          rating: this.calculateRating(prevState.moves + 1)
        }));

      }
    }


  };

  calculateRating = (moves)=>{

    //Perfect game assuming no luck is see all cards : 8 pairs
    //Then match all cards: 8 pairs
    //Thus 16 moves + 4 for fairness

    if(moves <= 20){
      return 3;
    }

    if(moves <=28) {
      return 2;
    }

    return 1;
  };

  checkMatch = ()=>this.state.selected[0].name === this.state.selected[1].name;

  endGame = ()=>(this.state.cards.length / 2) === this.state.matches;

  loadLeaderBoard = async ()=> await getItem(Game.STORAGE_KEYS.LEADERBOARD);

  saveLeaderBoard = async (leaders)=> await saveItem(Game.STORAGE_KEYS.LEADERBOARD, leaders);

  clearStorage = async ()=> await deleteItem(Game.STORAGE_KEYS.LEADERBOARD);

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
