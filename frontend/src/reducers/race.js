import { createSlice } from '@reduxjs/toolkit'

const race = createSlice({
  name: 'race',
  initialState: {
    chosenRace: "human",
    attributes: ["hair", "eyebrows", "eyes", "ears", "nose", "mouth", "head", "clothes"],
    imageSet: null
  },
  reducers: {
    setChosenRace: (store, action) => {
      store.chosenRace = action.payload
    },
    setAttributes: (store, action) => {
      store.attributes = action.payload
    },
    setImageSet: (store, action) => {
      store.imageSet = action.payload
    }
  }
})

export default race