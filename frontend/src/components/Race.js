import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

import Card from "./Card"

const Race = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  const onRaceChosen = (chosenRace) => {
    dispatch(race.actions.setChosenRace(chosenRace))
    history.push("/Creator")
  }

  return (
    <section className="races-main">
      <h1>Races</h1>
      <div className="race-cards-container">
        <Card
          onRaceChosen={onRaceChosen}
          imgUrl="../assets/human.png"
          title="Human"
          text="Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers"
        />
        <Card
          onRaceChosen={onRaceChosen}
          imgUrl="../assets/tiefling.png"
          title="Tiefling"
          text="To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
        />
      </div>
    </section>
  )
}

export default Race
