import succeed from '../images/success-icon.svg';
import failure from '../images/fail-icon.svg';

import { useEffect, useState, Provider } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import InfoTooltip from './InfoTooltip';

import api from '../utils/Api';
import auth from '../utils/Auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isProfileEditOpen, setProfileEditOpen] = useState(false);
  const [isAddCardFormOpen, setAddCardFormOpen] = useState(false);
  const [isUserAvatarFormOpen, setUserAvatarFormOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isCardOpen, setCardOpen] = useState(false);

  const [tooltipTitle, setTooltipTitle] = useState(null);
  const [tooltipIcon, setTooltipIcon] = useState(null);
  const [tooltipAlt, setTooltipAlt] = useState(null);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCard] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const isOpen = isAddCardFormOpen || 
    isProfileEditOpen || 
    isUserAvatarFormOpen || 
    isCardOpen || 
    isInfoTooltipOpen || 
    isConfirmationOpen

  const navigate = useNavigate();

  function userLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/');
        setTooltipTitle('Вход выполнен!');
        setTooltipIcon(succeed);
        setTooltipAlt('Вход выполнен');
      })
      .catch(() => {
        setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
        setTooltipIcon(failure);
        setTooltipAlt('Не удалось выполнить вход');
      })
      .finally(handleInfoTooltipOpen)
  }

  function userRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        navigate('/sign-in');
        setTooltipTitle('Вы успешно зарегистрировались!');
        setTooltipIcon(succeed);
        setTooltipAlt('Зарегестрирован');
      })
      .catch(() => {
        setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
        setTooltipIcon(failure);
        setTooltipAlt('Регистрация не прошла успешно');
      })
      .finally(handleInfoTooltipOpen);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((error) => { console.log(error) });
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((data) => {
          const [userData, cardsData] = data;

          setCurrentUser(userData);

          setCard(cardsData)
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
      }
  }, [loggedIn]);

  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setBurgerOpen(false);
    navigate('/sign-in');
  }

  function handleCardClick(cardsData) {
    setCardOpen(true);
    setSelectedCard({ name: cardsData.name, link: cardsData.link });
  }

  function handleConfirmationOpen(card) {
    setConfirmationOpen(true);
    setCurrentCard(card)
  }

  function handleUserPopupOpen() {
    setProfileEditOpen(true);
  }

  function handleAddCardFormOpen() {
    setAddCardFormOpen(true);
  }

  function handleUserAvatarFormOpen() {
    setUserAvatarFormOpen(true);
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function handleBurgerOpen() {
    setBurgerOpen(!isBurgerOpen);
  }

  function closeAllPopups() {
    setCardOpen(false);
    setProfileEditOpen(false);
    setAddCardFormOpen(false);
    setUserAvatarFormOpen(false);
    setConfirmationOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.createLike(card._id, !isLiked).then((newCard) => {
      setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
  }

  function handleUpdateUser(values) {
    setIsLoading(true);

    api.patchUserInfo({ name: values.name, about: values.about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(values) {
    setIsLoading(true);

    api.patchProfilePicture({ avatar: values.avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlacePopup(values) {
    setIsLoading(true);

    api.createCard({ name: values.name, link: values.link })
      .then((newCard) => {
        setCard([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleDeleteCard(evt) {
    setIsLoading(true);
    
    evt.preventDefault();
    
    api.deleteCard(currentCard._id)
      .then(() => {
        setCard(cards.filter((c) => c !== currentCard));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        email={userEmail}
        onClick={signOut}
        loggedIn={loggedIn}
        isOpen={isBurgerOpen}
        onBurgerClick={handleBurgerOpen} 
        />
      <Routes>
        <Route path='/sign-in' element={
            <Login 
              onLogin={userLogin} 
            />
        } />
        <Route path='/sign-up' element={
            <Register 
              onRegister={userRegister} 
            />
        } />
        <Route path='/' element={
          <>
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              openEdit={handleUserPopupOpen} 
              openAddCard={handleAddCardFormOpen}
              openUserPicture={handleUserAvatarFormOpen}
              openCard={handleCardClick}
              openDelete={handleConfirmationOpen}
              onCardLike={handleCardLike}
              cards={cards}
            />
            <Footer />
          </>
        }/>
      </Routes>
      <EditAvatarPopup 
        isOpen={isUserAvatarFormOpen}
        isClosed={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <EditProfilePopup 
        isOpen={isProfileEditOpen} 
        isClosed={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        currentUser={currentUser}
        isLoading={isLoading}
      />
      <AddPlacePopup 
        isOpen={isAddCardFormOpen}
        isClosed={closeAllPopups}
        onAddCard={handleAddPlacePopup}
        isLoading={isLoading}
      />
      <ImagePopup 
        card={selectedCard}
        isOpen={isCardOpen}
        isClosed={closeAllPopups}
      />
      <PopupWithConfirmation 
        isOpen={isConfirmationOpen}
        isClosed={closeAllPopups}
        onSubmit={handleDeleteCard}
        isLoading={isLoading}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isClosed={closeAllPopups}
        title={tooltipTitle}
        icon={tooltipIcon}
        alt={tooltipAlt}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
