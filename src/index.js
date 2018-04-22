// Dependencies
import 'babel-polyfill'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

// Components
import App from './App'

// Store
import store from './modules/store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
)

registerServiceWorker()
