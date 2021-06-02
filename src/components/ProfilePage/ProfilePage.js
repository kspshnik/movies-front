import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import currentUserContext from '../../contexts/currentUserContext'

import './ProfilePage.css';

function ProfilePage({ onSubmitProfile, onSignOut }) {
// const user = useContext(currentUserContext);
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@gde.to');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isNameValid, setNameValidity] = useState(true);
  const [isEmailValid, setEmailValidity] = useState(true);
  // const hasAnythingChanged = () => name !== user.name || email !== user.email;

  const isFormValid = () => isNameValid && isEmailValid; //  & hasAnythingChanged;

  function handleNameChange(event) {
    const input = event.target;
    setName(input.value);
    setNameValidity(input.validity.valid);
    if (!input.validity.valid) {
      setNameError(input.validationMessage);
    } else {
      setNameError('');
    }
  }

  function handleEmailChange(event) {
    const input = event.target;
    setEmail(input.value);
    setEmailValidity(input.validity.valid);
    if (!input.validity.valid) {
      setEmailError(input.validationMessage);
    } else {
      setEmailError('');
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitProfile(name, email);
  }

  return (
    <main className='profile'>
      <section className='profile__lead'>
        <h2 className='profile__heading'>Привет, Виталий!</h2>
      </section>
      <form
        name='ProfileForm'
        className='profile__form'>
        <fieldset className='profile__inputs'>
          <div className='profile__item'>
            <p className='profile__label'>
              Имя
            </p>
            <input
              id='name-input'
              name='nameInput'
              type='text'
              className='profile__input'
              required
              minLength='2'
              maxLength='40'
              value={name}
              onChange={handleNameChange} />
          </div>
          <span
            id='name-input-error'
            className='profile__error'>
            {nameError}
          </span>
          <div className='profile__separator' />
          <div className='profile__item'>
            <p className='profile__label'>
              E-mail
            </p>
            <input
              id='email-input'
              name='emailInput'
              type='email'
              className='profile__input'
              required
              minLength='2'
              maxLength='200'
              value={email}
              onChange={handleEmailChange} />
          </div>
          <span
            id='title-input-error'
            className='profile__error'>
            {emailError}
          </span>
        </fieldset>
        <div className='profile__buttons'>
          <button
            type='submit'
            className='profile__submit'
            onClick={handleSubmit}
            disabled={!isFormValid()}>
            Редактировать
          </button>
          <button
            type='button'
            className='profile__signout'
            onClick={onSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

ProfilePage.propTypes = {
  onSubmitProfile: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,

};
export default ProfilePage;
