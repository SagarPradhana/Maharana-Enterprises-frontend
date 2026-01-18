import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';

const API_URL = 'http://localhost:5000/api/orders';

interface OrderState {
    loading: boolean;
    success: boolean;
    order: any;
    error: string | null;
}

const initialState: OrderState = {
    loading: false,
    success: false,
    order: null,
    error: null,
};

export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData: any, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as RootState;
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            };

            const response = await axios.post(API_URL, orderData, config);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Order failed');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.success = false;
            state.error = null;
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
