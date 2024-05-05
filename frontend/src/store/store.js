import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/adminSlice"
import employeeReducer from "../slices/employeeSlice"
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
admin:adminReducer,
employee:employeeReducer


})


const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);




export const store = configureStore({
    
    reducer:persistedReducer
})

export const persistor = persistStore(store);