import React from "react";
import { NavLink } from "react-router-dom";
import useFormValidation from "../utils/useFormValidation";

function Register({ onRegister }) {
  const { values, errors, onChange } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(values.email, values.password);
  }

  return(
    <section className='auth'>
      <h2 className='auth__header'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input 
          className='auth__input' 
          type='email' 
          name='email'
          placeholder='Email' 
          value={values.email || ''}
          onChange={onChange}
          required
        />
        <span className='auth__input-error'>{errors.email || ''}</span>
        <input 
          className='auth__input' 
          type='password' 
          name='password'
          placeholder='Пароль' 
          value={values.password || ''}
          onChange={onChange}
          required
        />
        <span className='auth__input-error'>{errors.email || ''}</span>
        <button className='auth__button' type='submit'>Зарегестрироваться</button>
        <NavLink to='/sign-in' className="auth__link">Уже зарегистрированы? Войти</NavLink>
      </form>
    </section>
  );
}

export default Register;