import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    countInStock: number;
}

interface ProductState {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
    success: boolean; // for mutation success
}

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
};

// Helper for Auth Header
const getConfig = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` }
});

// Fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

// Create Product
export const createProduct = createAsyncThunk(
    'products/create',
    async ({ productData, token }: { productData: any, token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, productData, getConfig(token));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

// Update Product
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, productData, token }: { id: string, productData: any, token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, productData, getConfig(token));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async ({ id, token }: { id: string, token: string }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getConfig(token));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Fetch all
        builder.addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; });
        builder.addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Fetch single
        builder.addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; });
        builder.addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Create
        builder.addCase(createProduct.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Update
        builder.addCase(updateProduct.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        });
        builder.addCase(updateProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

        // Delete
        builder.addCase(deleteProduct.pending, (state) => { state.loading = true; state.error = null; state.success = false; });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.products = state.products.filter(p => p.id !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { resetSuccess } = productSlice.actions;
export default productSlice.reducer;
