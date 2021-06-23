import React from "react"

const Footer = () => {
  return (
    <footer>
      <div>
        <h4>Erika A Porath</h4>
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/erika-andersson-porath-5308a8113/">
            <img src="./assets/linkedin.svg" alt="LinkedIn icon" />
          </a>
          <a href="https://github.com/TheErry">
            <img src="./assets/github.svg" alt="GitHub icon" />
          </a>
        </div>
      </div>
      <div>
        <h4>Katharina Liebig</h4>
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/katharina-liebig-ab05a1203/">
            <img src="./assets/linkedin.svg" alt="LinkedIn icon" />
          </a>
          <a href="https://github.com/katliebig">
            <img src="./assets/github.svg" alt="GitHub icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer