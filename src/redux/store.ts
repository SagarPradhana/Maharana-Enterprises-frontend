import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import serviceReducer from './slices/serviceSlice';
import bookingReducer from './slices/bookingSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
// import wishlistReducer from './slices/wishlistSlice';
// import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        services: serviceReducer,
        bookings: bookingReducer,
        cart: cartReducer,
        order: orderReducer,
        // wishlist: wishlistReducer,
        // user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
