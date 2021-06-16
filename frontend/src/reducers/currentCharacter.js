import { createSlice } from '@reduxjs/toolkit'

const currentCharacter = createSlice({
  name: 'currentCharacter',
  initialState: {
    character: null
  },
  reducers: {
    setCharacter: (store, action) => {
      store.character = action.payload
    }
  }
})

export default currentCharacter
