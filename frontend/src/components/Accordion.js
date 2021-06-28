import React from 'react'
import Collapsible from 'react-collapsible'

const Accordion = () => {
  return (
    <div className="accordion-container">
      <h4>FAQ</h4>
      <Collapsible trigger="What is this?">
        <p>
          This is a character creator where you can create avatar images for your characters.
        </p>
      </Collapsible>
      <Collapsible trigger="What is it for?">
        <p>
          This was made for TallTales but it's free to use for anyone who wants! It's aimed to create Dungeon and Dragon characters
          but you might find other uses for it.
        </p>
      </Collapsible>
      <Collapsible trigger="How does it work?">
        <p>
          In the "Character creator" tap you'll find the creator. There you can create your character by chosing a race, and then what 
          attributes you want to change. Use the arrow buttons to switch between the different images. If you log in you'll be able to
          save your character in the gallery. There you also have a personal gallery where you can also fill in a character sheet for
          your characters. And you are of course free to delete them whenever you want.
        </p>
      </Collapsible>
      <Collapsible trigger="Who made this?">
        <p>
          This site was made as the final project of Technigos Frontend bootcamp, by Katharina Liebig and Erika Andersson Porath. 
        </p>
      </Collapsible>
      <Collapsible trigger="Who made the images?">
        <p>
          The images for the creator was made by Erika Andersson Porath, and the images on the cards is from seekpng.com and toppng.com. 
          This might change in the future. 
        </p>
      </Collapsible>
      <Collapsible trigger="Will the page be updated?">
      <p>
        Yes, the're will probably be additions to the attributes in the creator and hopefully have more races added.
      </p>
    </Collapsible>
    </div>
  );
};

export default Accordion