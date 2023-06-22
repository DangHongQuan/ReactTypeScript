import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import rootReducerfirebase from '../reducers/cartFirebaseReducer';

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Combine multiple reducers into root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
});



// Create the Redux store
const store = createStore(rootReducer);


export default store;
