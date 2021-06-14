import React from "react"
import { useSelector } from 'react-redux'

import { API_URL } from '../reusables/urls'

const UserGalleryCard = ({ character }) => {
  const accessToken = useSelector(store => store.user.accessToken)

  const onCharacterDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`characters/users/${id}`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  }

  return (
    <div className="gallery-card user-gallery-card">
      <div className="user-gallery-card-icons">
        <img
          src="./assets/bin.svg"
          alt="bin icon"
          className="user-gallery-card-icon"
          onClick={() => onCharacterDelete(character._id)}
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