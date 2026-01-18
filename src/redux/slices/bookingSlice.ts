import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';

const API_URL = 'http://localhost:5000/api/bookings';

interface Booking {
    id: string;
    serviceId: string;
    serviceName: string;
    date: string;
    address: string;
    status: string;
}

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    success: false,
    error: null,
};

// Create Booking
export const createBooking = createAsyncThunk(
    'bookings/create',
    async (bookingData: any, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as RootState;
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            };

            const response = await axios.post(API_URL, bookingData, config);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Booking failed');
        }
    }
);

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        resetBookingState: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.bookings.push(action.payload);
        });
        builder.addCase(createBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
