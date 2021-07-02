import React from "react"
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

const ImageCarousel = ({ linkTo, linkText }) => {
  return (
    <div className="carousel-link-container">
      <Carousel
        className="login-image-container"
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        showArrows={false}
        swipeable={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
      >
        <img id="login-image" src="./assets/elf.png" alt="elf" />
        <img id="login-image" src="./assets/tiefling.png" alt="tiefling" />
        <img id="login-image" src="./assets/human.png" alt="human" />
        <img id="login-image" src="./assets/dwarf.png" alt="dwarf" />
        <img id="login-image" src="./assets/human1.png" alt="human" />
        <img id="login-image" src="./assets/tiefling1.png" alt="tiefling" />
      </Carousel>
      <Link to={linkTo} className="link" >{linkText}</Link>
    </div>
  )
}

export default ImageCarousel