import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

import Card from "./Card"

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
      <h1>Races</h1>
      <Card 
        imgUrl="../assets/human.png"
        title="Human"
        text="Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers"
      />
      <Card 
        imgUrl="../assets/tiefling.png"
        title="Tiefling"
        text="To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
      />
      <select onChange={(e) => setChosenRace(e.target.value)}>
        <option value="human">Human</option>
        <option value="tiefling">Tiefling</option>
      </select>
      <button onClick={onButtonClick}>Go to creator!</button>
    </>
  )
}

export default Race
