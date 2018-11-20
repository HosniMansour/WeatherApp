import React from "react";
import ReactDOM from "react-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk'
import persistedReducer from "./reducers";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from "./App";

let store = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
			<App />
        </PersistGate>
	</Provider>
	,
	document.getElementById("root")
);
