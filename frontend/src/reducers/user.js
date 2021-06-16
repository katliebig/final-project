import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
    id: JSON.parse(localStorage.getItem('user')).id,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    currentCharacter: null,
    errors: null
  }
  : {
    id: null,
    username: null,
    accessToken: null,
    currentCharacter: null,
    errors: null
  }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (store, action) => {
      store.id = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setCurrentCharacter: (store, action) => {
      store.currentCharacter = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user