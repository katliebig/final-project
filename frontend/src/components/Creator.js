import React, { useState } from 'react';

const Creator = () => {
  const [attribute, setAttribute] = useState("")
  const [hair, setHair] = useState(1)
  const [eyebrows, setEyebrows] = useState(1)

  const onAttributeChangeUp = () => {
    if (attribute === "hair") {
      if (hair < 3) {
        setHair(prevState => prevState + 1)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows < 3) {
        setEyebrows(prevState => prevState + 1)
      }
    }
  }

  const onAttributeChangeDown = () => {
    if (attribute === "hair") {
      if (hair > 1) {
        setHair(prevState => prevState - 1)
      }
    } else if (attribute === "eyebrows") {
      if (eyebrows > 1) {
        setEyebrows(prevState => prevState - 1)
      }
    }
  }

  return (
    <div className="creator-container">
      <select onChange={(e) => setAttribute(e.target.value)}>
        <option value="hair">Hair</option>
        <option value="eyebrows">Eyebrows</option>
      </select>
      <button onClick={onAttributeChangeDown}>{"<"}-</button>
      <button onClick={onAttributeChangeUp}>-{">"}</button>
      <div className="creator-image-container">
        <img className="creator-image" src={`./assets/hair${hair}.png`} />
        <img className="creator-image" src={`./assets/eyebrows${eyebrows}.png`} />
        <img className="creator-image" src="./assets/eyes1.png" />
        <img className="creator-image" src="./assets/ears1.png" />
        <img className="creator-image" src="./assets/nose1.png" />
        <img className="creator-image" src="./assets/mouth1.png" />
        <img className="creator-image" src="./assets/head1.png" />
        <img className="creator-image" src="./assets/clothes1.png" />
      </div>
    </div>
  )
}

export default Creator