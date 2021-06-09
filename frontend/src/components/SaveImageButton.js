import React from 'react'
import { useSelector } from "react-redux"
import mergeImages from 'merge-images'

import { API_URL } from '../reusables/urls'

const SaveImageButton = ({ character }) => {
  const attributes = useSelector(store => store.race.attributes)
  const imageSet = useSelector(store => store.race.imageSet)
  const accessToken = useSelector(store => store.user.accessToken)

  const onCharacterSave = () => {

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
          body: JSON.stringify({ image: b64 })
        })
          .then(res => res.json())
          .then(data => console.log(data))
      })
  }

  return (
    <button onClick={onCharacterSave}>Save to gallery</button>
  )
}

export default SaveImageButton
