import './public/css/user.css';
import './public/css/ie10-viewport-bug-workaround.css';
import './public/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './src/Routes';

/**
 * @description This renders view inside #app div
 */

ReactDOM.render(
    Routes,
    document.getElementById('app')
)