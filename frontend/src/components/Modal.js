import React from "react"

import CharacterSheet from "./CharacterSheet"

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      <div className={`modal-border ${showModal ? "show-modal" : "hide-modal"}`}>
        <div className="modal">
          <button onClick={() => setShowModal(false)} className="modal-close">
            <img src="./assets/cancel.svg" alt="cancel icon" />
          </button>
          <CharacterSheet />
        </div>
      </div>
    </>
  )
}

export default Modal