import React from 'react'

import HomeCard from '../components/HomeCard'

const Home = () => {
  return (
    <section className="main">
      <h2>Welcome to the character creator!</h2>
      <p className="main-text">This is an image creator mainly aimed to create DnD characters. Register and log in to get access to these cool features!</p>
      <div className="cards-container">
        <HomeCard
          imgUrl="../assets/races-screenshot.png"
          title="Races"
          text="A page with an overview of all the races you can choose from. With a simple click you can create your chosen race in the creator."
        />
        <HomeCard
          imgUrl="../assets/character-creator.png"
          title="Character creator"
          text="A character creator where you can create your character and then save your them to your gallery."
        />
        <HomeCard
          imgUrl="../assets/user-gallery.png"
          title="User gallery"
          text="Your personal gallery where you store all your characters and are able to delete them and fill in an character sheet."
        />
      </div>
    </section>
  )
}

export default Home
