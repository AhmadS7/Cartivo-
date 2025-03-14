import { configureStore } from '@reduxjs/toolkit';
    import productsReducer from './productsSlice';
    import cartReducer from './cartSlice';
    import authReducer from './authSlice';

    const store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;

    export default store;
