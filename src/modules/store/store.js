// Dependencies
import { createStore, applyMiddleware } from 'redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import logger from 'redux-logger'
import searchReducer from '../search/search'

const store = createStore(
  searchReducer,
  applyMiddleware(reduxPackMiddleware, logger)
)

export default store
