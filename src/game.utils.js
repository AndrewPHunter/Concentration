import {CARD_ICONS} from './components/icon/icons.constants';

const shuffleDeck = (deck)=>{
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

export const generateDeck = ()=>{

  const makeCards = ()=>(Object.keys(CARD_ICONS).map(key=>({
    icon: CARD_ICONS[key],
    name: key,
    isFlipped: false
  })));

  return shuffleDeck([
    ...makeCards(),
    ...makeCards()
  ]);
};

export const padTime = (number)=>(
  ("0" + number).slice(-2)
);

