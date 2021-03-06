import React, { useState } from 'react'
import { useSelector } from "react-redux"
import mergeImages from 'merge-images'

import PopUp from './PopUp'

import { API_URL } from '../reusables/urls'

const SaveImageButton = ({ character }) => {
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpText, setPopUpText] = useState("")

  const attributes = useSelector(store => store.race.attributes)
  const imageSet = useSelector(store => store.race.imageSet)
  const accessToken = useSelector(store => store.user.accessToken)
  const chosenRace = useSelector(store => store.race.chosenRace)

  const onCharacterSave = () => {
    if (!accessToken) {
      setPopUpText("You need to log in to save a character")
      setShowPopUp(true)
      setTimeout(() => setShowPopUp(false), 3000)
    } else {
      const images = attributes.map(attribute => (
        imageSet[attribute][character[attribute]]
      ))

      mergeImages(images, { crossOrigin: 'anonymous' })
        .then(b64 => {
          fetch(API_URL("characters"), {
            method: "POST",
            headers: {
              "Authorization": accessToken,
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({ image: b64, race: chosenRace })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                setPopUpText("Character saved to gallery")
                setShowPopUp(true)
                setTimeout(() => setShowPopUp(false), 3000)
              } else {
                alert(data.message)
              }
            })
        })
    }
  }

  return (
    <>
      {showPopUp && <PopUp text={popUpText} />}
      <button onClick={onCharacterSave} className="creator-button">
        <img src="./assets/save.svg" alt="save icon" className="card-icon" />
        Save
      </button>
    </>
  )
}

export default SaveImageButton
