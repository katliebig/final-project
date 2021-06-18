import React from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const GalleryCard = ({ character }) => {
  return (
    <div className="card gallery-card">
      <img
        src={character.image}
        alt="character"
        className="character-image"
      />
      <p className="character-image-created-by">
        Created by
        <span className="character-image-user"> {character.user.username}</span>
      </p>
      <p className="character-image-created-at">{dayjs().to(character.createdAt)}</p>
      {/* <p className="character-image-race">Race: {character.race}</p> */}
    </div>
  )
}

export default GalleryCard