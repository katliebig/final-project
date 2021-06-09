import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

const Race = () => {
  const [chosenRace, setChosenRace] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  const onButtonClick = () => {
    dispatch(race.actions.setChosenRace(chosenRace))
    history.push("/Creator")
  }

  return (
    <>
      <h1>Race</h1>
      <select onChange={(e) => setChosenRace(e.target.value)}>
        <option value="human">Human</option>
        <option value="tiefling">Tiefling</option>
      </select>
      <button onClick={onButtonClick}>Go to creator!</button>
    </>
  )
}

export default Race
