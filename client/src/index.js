import 'materialize-css/dist/css/materialize.min.css'
import "./styles/global.scss"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'


import App from './components/App'
import reducers from './reducers'
import axios from 'axios'
window.axios = axios

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

console.log(process.env.REACT_APP_STRIPE)
