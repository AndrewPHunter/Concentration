import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Open Sans: 300, 400, 700', 'Rock Salt']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
