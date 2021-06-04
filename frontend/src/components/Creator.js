import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import mergeImages from 'merge-images'

import raceImageSet from "../reducers/raceImageSet"

import { API_URL } from '../reusables/urls'

const Creator = () => {
  const [attribute, setAttribute] = useState("")
  const [hair, setHair] = useState(0)
  const [eyebrows, setEyebrows] = useState(0)
  const [eyes, setEyes] = useState(0)
  const [mouth, setMouth] = useState(0)
  const [nose, setNose] = useState(0)
  const [head, setHead] = useState(0)
  const [clothes, setClothes] = useState(0)
  const [ears, setEars] = useState(0)
  const [savedImage, setSavedImage] = useState("")

  const imageSet = useSelector(store => store.raceImageSet.imageSet)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  // const [species, setSpecies] = useState({
  //   hair: 0,
  //   eyebrows: 0,
  //   eyes: 0,
  // })

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  useEffect(() => {
    fetchImageSet()
  }, [accessToken])

  const fetchImageSet = () => {
    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL("human"), options)
        .then(res => res.json())
        .then(data => {
          dispatch(raceImageSet.actions.setRaceImageSet(data))
        })
        .catch(error => console.log(error))
    }
  }

  // TODO: refactor attribute change
  // const onDecremtAttribute = () => {
  //   onAttributeChange(-1)
  // }
  // const onIncrementAttribute = () => {
  //   onAttributeChange(1)
  // }
  // const onAttributeChange = (change) => {
  //   const someVal = species[attribute] < imageSet[attribute].length - 1;
  //   const newValue = species[attribute] + change;
  //   let newSpecies = species;
  //   newSpecies[attribute] = newValue;
  //   setSpecies(newSpecies)
  // }

  const onAttributeChangeUp = () => {
    if (attribute === "hair") {
      if (hair < imageSet.hair.length - 1) {
        setHair(prevState => prevState + 1)
      } else if (hair === imageSet.hair.length - 1) {
        setHair(0)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows < imageSet.eyebrows.length - 1) {
        setEyebrows(prevState => prevState + 1)
      } else if (eyebrows === imageSet.eyebrows.length - 1) {
        setEyebrows(0)
      }
    } else if (attribute === "eyes") {
      if (eyes < imageSet.eyes.length - 1) {
        setEyes(prevState => prevState + 1)
      } else if (eyes === imageSet.eyes.length - 1) {
        setEyes(0)
      }
    } else if (attribute === "mouth") {
      if (mouth < imageSet.mouth.length - 1) {
        setMouth(prevState => prevState + 1)
      } else if (mouth === imageSet.mouth.length - 1) {
        setMouth(0)
      }
    } else if (attribute === "nose") {
      if (nose < imageSet.nose.length - 1) {
        setNose(prevState => prevState + 1)
      } else if (nose === imageSet.nose.length - 1) {
        setNose(0)
      }
    } else if (attribute === "ears") {
      if (ears < imageSet.ears.length - 1) {
        setEars(prevState => prevState + 1)
      } else if (ears === imageSet.ears.length - 1) {
        setEars(0)
      }
    } else if (attribute === "head") {
      if (head < imageSet.head.length - 1) {
        setHead(prevState => prevState + 1)
      } else if (head === imageSet.head.length - 1) {
        setHead(0)
      }
    } else if (attribute === "clothes") {
      if (clothes < imageSet.clothes.length - 1) {
        setClothes(prevState => prevState + 1)
      } else if (clothes === imageSet.clothes.length - 1) {
        setClothes(0)
      }
    }
  }

  const onAttributeChangeDown = () => {
    if (attribute === "hair") {
      if (hair > 0) {
        setHair(prevState => prevState - 1)
      } else if (hair === 0) {
        setHair(imageSet.hair.length - 1)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows > 0) {
        setEyebrows(prevState => prevState - 1)
      } else if (eyebrows === 0) {
        setEyebrows(imageSet.eyebrows.length - 1)
      }
    } else if (attribute === "eyes") {
      if (eyes > 0) {
        setEyes(prevState => prevState - 1)
      } else if (eyes === 0) {
        setEyes(imageSet.eyes.length - 1)
      }
    } else if (attribute === "mouth") {
      if (mouth > 0) {
        setMouth(prevState => prevState - 1)
      } else if (mouth === 0) {
        setMouth(imageSet.mouth.length - 1)
      }
    } else if (attribute === "nose") {
      if (nose > 0) {
        setNose(prevState => prevState - 1)
      } else if (nose === 0) {
        setNose(imageSet.nose.length - 1)
      }
    } else if (attribute === "ears") {
      if (ears > 0) {
        setEars(prevState => prevState - 1)
      } else if (ears === 0) {
        setEars(imageSet.ears.length - 1)
      }
    } else if (attribute === "head") {
      if (head > 0) {
        setHead(prevState => prevState - 1)
      } else if (head === 0) {
        setHead(imageSet.head.length - 1)
      }
    } else if (attribute === "clothes") {
      if (clothes > 0) {
        setClothes(prevState => prevState - 1)
      } else if (clothes === 0) {
        setClothes(imageSet.clothes.length - 1)
      }
    }
  }

  const onCharacterSave = () => {
    //mergeImages(['/assets/clothes1.png', '/assets/clothes1.png']).then((str) => console.log(str))

    mergeImages([
      imageSet.hair[hair],
      imageSet.eyebrows[eyebrows],
      imageSet.eyes[eyes],
      imageSet.ears[ears],
      imageSet.nose[nose],
      imageSet.mouth[mouth],
      imageSet.head[head],
      imageSet.clothes[clothes]
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
    <div className="creator-container">
      <select onChange={(e) => setAttribute(e.target.value)}>
        <option value="hair">Hair</option>
        <option value="eyebrows">Eyebrows</option>
        <option value="eyes">Eyes</option>
        <option value="ears">Ears</option>
        <option value="nose">Nose</option>
        <option value="mouth">Mouth</option>
        <option value="head">Head</option>
        <option value="clothes">Clothes</option>
      </select>
      <button onClick={onAttributeChangeDown}>{"<"}-</button>
      <button onClick={onAttributeChangeUp}>-{">"}</button>
      <button onClick={onCharacterSave}>Save to gallery</button>

      {imageSet &&
        <div className="creator-image-container">
          <img className="creator-image" src={imageSet.hair[hair]} alt="hair" />
          <img className="creator-image" src={imageSet.eyebrows[eyebrows]} alt="eyebrows" />
          <img className="creator-image" src={imageSet.eyes[eyes]} alt="eyes" />
          <img className="creator-image" src={imageSet.ears[ears]} alt="ears" />
          <img className="creator-image" src={imageSet.nose[nose]} alt="nose" />
          <img className="creator-image" src={imageSet.mouth[mouth]} alt="mouth" />
          <img className="creator-image" src={imageSet.head[head]} alt="head" />
          <img className="creator-image" src={imageSet.clothes[clothes]} alt="clothes" />
        </div>
      }
    </div>
  )
}

export default Creator