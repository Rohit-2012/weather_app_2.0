import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWeatherData } from "../services/axios"

const initialState = {
    weatherData: {},
    status: 'idle',
    error: null
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (params) => {
    const {city, unit} = params
    try {
        const data = await fetchWeatherData(city, unit)
        return data
    } catch (error) {
        throw new Error(error.message)
    }
})

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'succeeded'
                state.weatherData = action.payload
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed'
                state.weatherData = {}
                state.error = action.error.message
        })
    }
})

export const getWeatherData = (state) => state.weather.weatherData
export const getStatus = (state) => state.weather.status
export const getError = (state) => state.weather.error

export default weatherSlice.reducer