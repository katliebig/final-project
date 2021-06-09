import { createSlice } from '@reduxjs/toolkit'

const race = createSlice({
  name: 'race',
  initialState: {
    chosenRace: null,
    imageSet: null
  },
  reducers: {
    setChosenRace: (store, action) => {
      store.chosenRace = action.payload
    },
    setImageSet: (store, action) => {
      store.imageSet = action.payload
    }
  }
})

export default race