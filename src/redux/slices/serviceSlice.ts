import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    image: string;
}

interface ServiceState {
    services: Service[];
    service: Service | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ServiceState = {
    services: [],
    service: null,
    loading: false,
    error: null,
    success: false,
};

const getConfig = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchServices = createAsyncThunk(
    'services/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
        }
    }
);

export const fetchServiceById = createAsyncThunk(
    'services/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
        }
    }
);

export const createService = createAsyncThunk(
    'services/create',
    async ({ serviceData, token }: { serviceData: any, token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, serviceData, getConfig(token));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create service');
        }
    }
);

export const updateService = createAsyncThunk(
    'services/update',
    async ({ id, serviceData, token }: { id: string, serviceData: any, token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, serviceData, getConfig(token));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update service');
        }
    }
);

export const deleteService = createAsyncThunk(
    'services/delete',
    async ({ id, token }: { id: string, token: string }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getConfig(token));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete service');
        }
    }
);

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        resetServiceSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchServices.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchServices.fulfilled, (state, action) => { state.loading = false; state.services = action.payload; });
        builder.addCase(fetchServices.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Fetch Single
        builder.addCase(fetchServiceById.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchServiceById.fulfilled, (state, action) => { state.loading = false; state.service = action.payload; });
        builder.addCase(fetchServiceById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Create
        builder.addCase(createService.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(createService.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.services.push(action.payload);
        });
        builder.addCase(createService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Update
        builder.addCase(updateService.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            const index = state.services.findIndex(s => s.id === action.payload.id);
            if (index !== -1) state.services[index] = action.payload;
            state.service = action.payload; // Update single view too if active
        });
        builder.addCase(updateService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Delete
        builder.addCase(deleteService.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.services = state.services.filter(s => s.id !== action.payload);
        });
        builder.addCase(deleteService.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { resetServiceSuccess } = serviceSlice.actions;
export default serviceSlice.reducer;
