import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {rootSaga} from './sagas';
import {AuthReducer, ColumnReducer} from './reducers';

const sagaMiddlware = createSagaMiddleware();
const rootReducer = combineReducers({
  AuthReducer,
  ColumnReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddlware));

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

sagaMiddlware.run(rootSaga);
