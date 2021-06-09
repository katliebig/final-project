import React from 'react'
import { useSelector } from "react-redux"
import mergeImages from 'merge-images'

import { API_URL } from '../reusables/urls'

const SaveImageButton = ({ character }) => {
  const imageSet = useSelector(store => store.race.imageSet)
  const accessToken = useSelector(store => store.user.accessToken)

  const onCharacterSave = () => {
    mergeImages([
      imageSet.head[character.head],
      imageSet.eyebrows[character.eyebrows],
      imageSet.eyes[character.eyes],
      imageSet.nose[character.nose],
      imageSet.mouth[character.mouth],
      // imageSet.clothes[character.clothes],
      imageSet.leftHorn[character.leftHorn],
      imageSet.facialHair[character.facialHair],
      imageSet.hair[character.hair],
      imageSet.ears[character.ears],
      imageSet.rightHorn[character.rightHorn]
    ], { crossOrigin: 'anonymous' })
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
