import React from "react";
import logo from '../images/mesto_logo.svg';
import { NavLink, Route, Routes } from "react-router-dom";

import burger from '../images/burger.svg'
import close from '../images/close_icon.svg'

function Header({ isOpen, email, onClick, onBurgerClick, loggedIn }) {
  return(
    <header className={`header ${isOpen && `header__mobile`}`}>
      <img src={logo} className="header__logo" alt="Mesto лого" />
        <Routes>
          <Route path='/sign-in' element={
            <NavLink to='/sign-up' className="header__route">Регистрация</NavLink>
          }/>
          <Route path='/sign-up' element={
            <NavLink to='/sign-in' className="header__route">Вход</NavLink>
          }/>
          <Route path='/' element={
            <>
            <nav className={`header__user-container ${isOpen && `header__user-container_active`}`}>
              <p className="header__email">{email}</p>
              <NavLink to='/sign-in' onClick={onClick} className="header__exit">Выход</NavLink>
            </nav>
            </>
          }/>
        </Routes>
        { loggedIn ?
          <img className="header__burger-menu" src={`${isOpen ? close : burger}`} onClick={onBurgerClick}/> : <></>
        }
    </header>
  );
}

export default Header;