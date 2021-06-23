import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import HomeCard from '../components/HomeCard'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <section className="main">
        <h2>Welcome to the character creator!</h2>
        <p className="main-text">This is an image creator mainly aimed to create DnD characters. Register and log in to get access to these cool features!</p>
        <Carousel className="cards-container home-cards-container" showStatus={false} showThumbs={false}>
          <HomeCard
            imgUrl="../assets/races-screenshot.png"
            title="Races"
            text="Here you can find all of the races you can choose from. Pick one and create your own character!"
          />
          <HomeCard
            imgUrl="../assets/character-creator.png"
            title="Character creator"
            text="A character creator where you can create a character image and save it to your personal gallery."
          />
          <HomeCard
            imgUrl="../assets/user-gallery.png"
            title="User gallery"
            text="Your personal gallery where you store and manage all your characters. Here you can fill in a character sheet or delete a character."
          />
        </Carousel>
      </section>
      <Footer />
    </>
  )
}

export default Home
