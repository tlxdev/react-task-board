import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import PopoverRouter from './PopoverRouter';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Main />, document.getElementById('root'));
//ReactDOM.render(<PopoverRouter />, document.getElementById('popover'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
