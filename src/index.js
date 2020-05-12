import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jquery.caret';

import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import './styles/editor.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/vendors/fontawesome/css/fontawesome-all.min.css';
import 'blueimp-canvas-to-blob';

window.$ = window.jQuery = $;

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
