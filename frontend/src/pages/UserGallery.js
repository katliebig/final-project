import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import UserGalleryCard from '../components/UserGalleryCard'
import CharacterSheet from '../components/CharacterSheet';
import Loader from '../components/Loader'

const UserGallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);

  const charactersArray = useSelector(store => store.characters.charactersByUser)
  const id = useSelector(store => store.user.id)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }

    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`characters/users/${id}`), options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            dispatch(characters.actions.setCharactersByUser(data.characters))
            setIsLoading(false)
          } else {
            alert(data.message)
          }
        })
    }
  }, [dispatch, history, id, accessToken, isLoading])

  return (
    <section className="main">
      {isLoading && <Loader />}
      {!isLoading &&
        <>
          <Modal open={open} onClose={() => setOpen(false)} center>
            <CharacterSheet />
          </Modal>
          <div className="cards-container">
            {charactersArray.map(character => (
              <UserGalleryCard
                key={character._id}
                character={character}
                setOpen={setOpen}
                setIsLoading={setIsLoading}
              />
            ))}
          </div>
        </>}
    </section>
  )
}

export default UserGallery
