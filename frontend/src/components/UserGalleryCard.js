import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"

import { API_URL } from '../reusables/urls'

import user from '../reducers/user'

const UserGalleryCard = ({ character, setShowModal }) => {
  const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()
  const dispatch = useDispatch()

  const onCharacterDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`characters/${id}`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  }

  const onCharacterEdit = (id) => {
    dispatch(user.actions.setCurrentCharacter(id))
    setShowModal(true)
    // history.push("/UserGallery/CharacterSheet")
  }

  return (
    <div className="card gallery-card user-gallery-card">
      <div className="user-gallery-card-icons">
        <img
          src="./assets/bin.svg"
          alt="bin icon"
          className="user-gallery-card-icon"
          onClick={() => onCharacterDelete(character._id)}
        />
        <img
          src="./assets/edit.svg"
          alt="edit icon"
          className="user-gallery-card-icon"
          onClick={() => onCharacterEdit(character._id)}
        />
      </div>
      <img
        src={character.image}
        alt="character"
        className="character-image"
      />
    </div>
  )
}

export default UserGalleryCard