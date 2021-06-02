import React, { useState, useEffect } from 'react';

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
  const [race, setRace] = useState()

  useEffect(() => {
    fetch("http://localhost:8080/human")
      .then(res => res.json())
      .then(data => {
        setRace(data)
        console.log(data)
      })
      .catch(error => console.log(error))
  }, [])

  const onAttributeChangeUp = () => {
    if (attribute === "hair") {
      if (hair < race.hair.length - 1) {
        setHair(prevState => prevState + 1)
      } else if (hair === race.hair.length - 1) {
        setHair(0)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows < race.eyebrows.length - 1) {
        setEyebrows(prevState => prevState + 1)
      } else if (eyebrows === race.eyebrows.length - 1) {
        setEyebrows(0)
      }
    } else if (attribute === "eyes") {
      if (eyes < race.eyes.length - 1) {
        setEyes(prevState => prevState + 1)
      } else if (eyes === race.eyes.length - 1) {
        setEyes(0)
      }
    } else if (attribute === "mouth") {
      if (mouth < race.mouth.length - 1) {
        setMouth(prevState => prevState + 1)
      } else if (mouth === race.mouth.length - 1) {
        setMouth(0)
      }
    } else if (attribute === "nose") {
      if (nose < race.nose.length - 1) {
        setNose(prevState => prevState + 1)
      } else if (nose === race.nose.length - 1) {
        setNose(0)
      }
    } else if (attribute === "ears") {
      if (ears < race.ears.length - 1) {
        setEars(prevState => prevState + 1)
      } else if (ears === race.ears.length - 1) {
        setEars(0)
      }
    } else if (attribute === "head") {
      if (head < race.head.length - 1) {
        setHead(prevState => prevState + 1)
      } else if (head === race.head.length - 1) {
        setHead(0)
      }
    } else if (attribute === "clothes") {
      if (clothes < race.clothes.length - 1) {
        setClothes(prevState => prevState + 1)
      } else if (clothes === race.clothes.length - 1) {
        setClothes(0)
      }
    }
  }

  const onAttributeChangeDown = () => {
    if (attribute === "hair") {
      if (hair > 0) {
        setHair(prevState => prevState - 1)
      } else if (hair === 0) {
        setHair(race.hair.length - 1)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows > 0) {
        setEyebrows(prevState => prevState - 1)
      } else if (eyebrows === 0) {
        setEyebrows(race.eyebrows.length - 1)
      }
    } else if (attribute === "eyes") {
      if (eyes > 0) {
        setEyes(prevState => prevState - 1)
      } else if (eyes === 0) {
        setEyes(race.eyes.length - 1)
      }
    } else if (attribute === "mouth") {
      if (mouth > 0) {
        setMouth(prevState => prevState - 1)
      } else if (mouth === 0) {
        setMouth(race.mouth.length - 1)
      }
    } else if (attribute === "nose") {
      if (nose > 0) {
        setNose(prevState => prevState - 1)
      } else if (nose === 0) {
        setNose(race.nose.length - 1)
      }
    } else if (attribute === "ears") {
      if (ears > 0) {
        setEars(prevState => prevState - 1)
      } else if (ears === 0) {
        setEars(race.ears.length - 1)
      }
    } else if (attribute === "head") {
      if (head > 0) {
        setHead(prevState => prevState - 1)
      } else if (head === 0) {
        setHead(race.head.length - 1)
      }
    } else if (attribute === "clothes") {
      if (clothes > 0) {
        setClothes(prevState => prevState - 1)
      } else if (clothes === 0) {
        setClothes(race.clothes.length - 1)
      }
    }
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
      <div className="creator-image-container">
        <img className="creator-image" src={race ? race.hair[hair] : null} />
        <img className="creator-image" src={race ? race.eyebrows[eyebrows] : null} />
        <img className="creator-image" src={race ? race.eyes[eyes] : null} />
        <img className="creator-image" src={race ? race.ears[ears] : null} />
        <img className="creator-image" src={race ? race.nose[nose] : null} />
        <img className="creator-image" src={race ? race.mouth[mouth] : null} />
        <img className="creator-image" src={race ? race.head[head] : null} />
        <img className="creator-image" src={race ? race.clothes[clothes] : null} />
      </div>
    </div>
  )
}

export default Creator