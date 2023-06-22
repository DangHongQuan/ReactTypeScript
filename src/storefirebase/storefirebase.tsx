import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import rootReducerfirebase from '../reducers/cartFirebaseReducer';

// Define the root state type

export type RootStatefirebaseee = ReturnType<typeof rootReducerfirebase>;

  
// Combine multiple reducers into root reducer

const rootReducerfire = combineReducers({
  cart: rootReducerfirebase,
});

// Create the Redux store

const storeefirebase = createStore(rootReducerfire);

export default storeefirebase;
