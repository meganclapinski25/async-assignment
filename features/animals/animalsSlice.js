import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async () => {
    const response = await fetch ('https://dog.ceo/api/breeds/image/random/10')
    const data = await response.json();
    return data.message;
    // TODO (Signpost 2): fetch 10 random dog images and return an array of URLs
     API: https://dog.ceo/api/breeds/image/random/10
    // Expected: return data.message
    throw new Error('Not implemented');
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [],
    favorites: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      // TODO (Signpost 5): add the URL in action.payload to favorites (avoid duplicates)
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action) => {
        state.favorites = state.favorites.filter(url => url !== action.payload)
    },
    setFavorites: (state, action) => {
      // TODO (Signpost 7): replace favorites with action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        // TODO (Signpost 2): set status to 'loading' and clear error
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        // TODO (Signpost 2): set status to 'succeeded' and set animals = action.payload
        state.status = 'succeeded'
        state.animals = action.payload
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        // TODO (Signpost 2): set status to 'failed' and set error = action.error.message
        state.status = 'failed'
        state.error = action.error.message
      });
  },
});

export const { addFavorite, removeFavorite, setFavorites } = animalsSlice.actions;
export default animalsSlice.reducer;