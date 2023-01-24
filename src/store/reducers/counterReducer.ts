import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IinitialState {
    currentIndex: number
}

const initialState: IinitialState = {
    currentIndex: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incIndex(state) {
            state.currentIndex++
        },
        decIndex(state) {
            state.currentIndex--
        },
        setIndex(state, action: PayloadAction<number>) {
            state.currentIndex = action.payload
        }
    }
})

export default counterSlice.reducer