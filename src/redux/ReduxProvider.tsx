import React, { FC } from 'react';

///IMPORT  LIBRERIA REDUX Y REDUX SAGA
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

/// IMPORT INDICE DE  MIS SAGAS Y REDUCERS
import reducers from './reducers';

import { takeLatest } from "redux-saga/effects";



import { saveCandidateSaga } from './actions/candidateSaga';


export  function* watcherSaga() {
    yield takeLatest("SAVE_APPLICATION", saveCandidateSaga);
}


declare global {
   interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


// CREAR MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watcherSaga);


const ReduxProvider: FC = (props) => {
   return (
      <Provider store={store}>
         {props.children}
      </Provider>
   );
};


export default ReduxProvider;