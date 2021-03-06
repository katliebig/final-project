import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

import Card from "../components/Card"

const Race = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  const onRaceChosen = (chosenRace) => {
    dispatch(race.actions.setChosenRace(chosenRace))
    history.push("/creator")
  }

  return (
    <section className="main">
      <h2>Races</h2>
      <p className="main-text">Here you can choose what race you want to create. Just click on the card you like!</p>
      <div className="cards-container">
        <Card
          onRaceChosen={onRaceChosen}
          imgUrl="../assets/human2.png"
          title="Human"
          text="Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers."
        />
        <Card
          onRaceChosen={onRaceChosen}
          imgUrl="../assets/tiefling2.png"
          title="Tiefling"
          text="To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
        />
        <Card
          onRaceChosen={onRaceChosen}
          imgUrl="../assets/elf1.png"
          title="Elf"
          text="Elves are a magical people of otherworldly grace, living in the world but not entirely part of it."
        />
      </div>
      <div className="upcoming-container">
        <h2 className="upcoming-title">Upcoming</h2>
        <Card
          imgUrl="../assets/dwarf1.png"
          title="Dwarf"
          text="Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal."
        />
      </div>
    </section>
  )
}

export default Race
