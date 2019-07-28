import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store/configureStore' // исправлено
import { Provider } from 'react-redux'
import App from './App'
import 'typeface-roboto';

import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
