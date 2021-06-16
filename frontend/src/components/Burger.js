import React from 'react';
import { StyledBurger } from './Burger.styled.js';

const Burger = ({ open, setOpen}) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div className="burger-menu-line"/>
      <div className="burger-menu-line"/>
      <div className="burger-menu-line"/>
    </StyledBurger>
  )
}

export default Burger;