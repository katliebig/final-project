import { createSlice } from '@reduxjs/toolkit'

const characters = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    charactersByUser: []
  },
  reducers: {
    setCharacters: (store, action) => {
      store.characters = action.payload
    },
    setCharactersByUser: (store, action) => {
      store.charactersByUser = action.payload
    }
  }
})

export default characters
