import React from 'react';

const Loader = () => {
  return (
    // This loader is taken from Kim Rejström's codepen: https://codepen.io/kimrejstrom/details/KKppzjz

    <svg className="dice-loader" data-name="5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.85 155.44"><title>dice</title>
      <polygon className="breathe second" points="66.92 154.13 131.55 116.12 66.92 108.51 66.92 154.13"
        style={{ fill: "#5d1414", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px", fillRule: "evenodd" }} />
      <polygon className="breathe second" points="66.92 154.13 66.92 108.51 2.3 116.12 66.92 154.13"
        style={{ fill: "#6d1818", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe third" points="2.3 116.12 36.51 55.3 2.3 40.09 2.3 116.12"
        style={{ fill: "#7c1b1b", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px", fillRule: "evenodd" }} />
      <polygon className="breathe third" points="36.51 55.3 2.3 40.09 66.92 2.08 36.51 55.3"
        style={{ fill: "#8c1f1f", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe fourth" points="97.33 55.3 131.55 40.09 66.92 2.08 97.33 55.3"
        style={{ fill: "#9b2222", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe fourth" points="97.33 55.3 131.55 116.12 131.55 40.09 97.33 55.3"
        style={{ fill: "#a53838", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px", fillRule: "evenodd" }} />
      <polygon className="breathe first" points="66.92 108.51 131.55 116.12 97.33 55.3 66.92 108.51"
        style={{ fill: "#af4e4e", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe first" points="36.51 55.3 2.3 116.12 66.92 108.51 36.51 55.3"
        style={{ fill: "#af4e4e", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe first" points="36.51 55.3 66.92 2.08 97.33 55.3 36.51 55.3"
        style={{ fill: "#af4e4e", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px" }} />
      <polygon className="breathe" points="66.92 108.51 97.33 55.3 36.51 55.3 66.92 108.51"
        style={{ fill: "#b96464", stroke: "#fff", strokeMiterlimit: 10, strokeWidth: "1.5px", fillRule: "evenodd" }} />
    </svg>
  )
}

export default Loader
