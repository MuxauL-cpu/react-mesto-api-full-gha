import React from "react";

import useFormValidation from "../utils/useFormValidation";

function Login({ onLogin }) {
  const { values, errors, onChange } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin(values.email, values.password);
  }

  return(
    <section className='auth'>
      <h2 className='auth__header'>Вход</h2>
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
          minLength='6'
          required
        />
        <span className='auth__input-error'>{errors.password || ''}</span>
        <button className='auth__button' type='submit'>Войти</button>
      </form>
    </section>
  );
}

export default Login;