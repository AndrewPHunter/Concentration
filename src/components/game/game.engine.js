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

  //Perform card shuffling by starting at end of deck and swapping cards with random
  //card found within the deck
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

  //Start state of every new game
  //Game starts 'Paused'
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

  //Starts a new game by setting state to new game state configuration
  newGame = ()=>{
    this.state.gameClock && this.state.gameClock.stop();
    this.updateGameState(()=>({
      ...Game.newGameState(),
      cards: this.generateDeck(),
      inProgress:true
    }));
  };

  //Stops the game clock and sets the paused flag to true
  pauseGame = ()=>{
    this.state.gameClock.stop();
    this.updateGameState(()=>({
      paused: true
    }));
  };

  //Toggles the muted flag to play or pause the sound
  toggleSound = ()=>{
    this.updateGameState((prevState)=>({
      muted: !prevState.muted
    }));
  };

  //starts the game clock and sets paused flag to false
  resumeGame = ()=>{
    this.state.gameClock.start(this.timerUpdate);
    this.updateGameState(()=>({
      paused: false
    }));
  };

  //Callback function registered to the clock which updates the game time to be displayed as a string
  timerUpdate = (totalSeconds)=>{

    this.updateGameState(()=>({
      time: `${padTime(Math.floor(totalSeconds/60))} : ${padTime(totalSeconds - Math.floor(totalSeconds/60) * 60)}`
    }));

  };

  //Goes through all cards in the game and sets their flipped flag to false, making them 'face down'
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

  //Deck consists of pairs of the same icon card. Maps through all icons twice to give complete deck of card
  //with all pairs
  generateDeck = ()=>{

    const makeCards = ()=>(Object.keys(CARD_ICONS).map(key=>({
      icon: CARD_ICONS[key],
      name: key,
      isFlipped: false,
      matched: false
    })));

    return Game.shuffleDeck([...makeCards(), ...makeCards()]);

  };

  //When a card is selected:
  // 1. See if two cards have been selected
  // 2. if yes check for match
  // 3. if match, set cards as matched and update match count
  // 4. if not, flip cards back over
  // 5. for all possibilities update move count where 1 move is two cards selected
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


    //We have selected two cards, now check for match
    if(this.state.selected.length===2){

      const cards = [...this.state.cards];

      //HACK: Allow for card animation
      await timeout(800);


      if(this.checkMatch()){

        //Go through all the cards and leave as matched if matched or if they were part of the matched pair set to
        //matched
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

        //Cards arent a match so only leave cards that were matched flipped
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

  //Load leaderboard from local store
  loadLeaderBoard = async ()=> await getItem(Game.STORAGE_KEYS.LEADERBOARD);

  //save the leaderboard to local store
  saveLeaderBoard = async (leaders)=> await saveItem(Game.STORAGE_KEYS.LEADERBOARD, leaders);

  //clear out the leader board
  clearStorage = async ()=> await deleteItem(Game.STORAGE_KEYS.LEADERBOARD);

  //Utility function to update gamestate while maintaining immutability
  // Notify all subscribers of game that state has been changed
  updateGameState = (predicate)=>{
    const gameState = this.state;

    this.state = {
      ...gameState,
      ...predicate(gameState)
    };

    Object.keys(this.listeners).forEach(key=>this.listeners[key](this.state));
  };

  //Standard subscribe pattern
  subscribe = (listener)=>{
    const id = generateId();
    this.listeners[id] = listener;
    return id;
  };

  unsubscribe = (id)=>{
    delete this.listeners[id];
  };
}

//Game is a singleton
const game = new Game();
export default game;
