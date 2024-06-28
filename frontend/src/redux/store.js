import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import cartReducer, { setCartFromLocalStorage } from './cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});

// Use subscribe to listen for changes in the store
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('localCart', JSON.stringify(state.cart));
});

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('localCart');
    if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        store.dispatch(setCartFromLocalStorage(parsedCart));
    }
};

loadCartFromLocalStorage();

export default store;
