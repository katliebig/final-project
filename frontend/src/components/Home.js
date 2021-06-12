import React from 'react'

import HomeCard from './HomeCard'

const Home = () => {
  return (
    <section className="home-main">
      <h1>Welcome to the character creator!</h1>
        <div className="home-cards-container">
        <HomeCard
          imgUrl="../assets/races-screenshot.png"
          title="Races"
          text="Page with all the races you can choose from"
        />
        <HomeCard
          imgUrl="../assets/character-example.png"
          title="Character creator"
          text="Here you can create your character"
        />
        <HomeCard
          imgUrl="../assets/character-example.png"
          title="Gallery"
          text="A gallery with all the characters created by all the users"
        />
        <HomeCard
          imgUrl="../assets/character-example.png"
          title="User gallery"
          text="Your personal gallery where you store all your characters and are able to delete them"
        />
      </div>
    </section>
  )
}

export default Home
