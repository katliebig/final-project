import { createSlice } from '@reduxjs/toolkit'

const raceImageSet = createSlice({
  name: 'raceImageSet',
  initialState: {
    imageSet: null
  },
  reducers: {
    setRaceImageSet: (store, action) => {
      store.imageSet = action.payload
    }
  }
})

export default raceImageSet