import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, openCard, deleteClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const isOwn = card.owner === currentUser._id;

  function handleCardClick() {
    openCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    deleteClick(card)
  }

  return(
    <li className="elements__card">
      <img src={card.link} className="elements__image" alt={card.name} onClick={handleCardClick} />
      <button type="button" aria-label="Delete" className={`elements__delete-button ${isOwn ? `elements__delete-button_visible` : ''}`} onClick={handleDeleteClick}></button>
      <div className="elements__description-container">
        <h2 className="elements__description-title">{card.name}</h2>
          <div className="elements__like-container">
            <button type="button" aria-label="Лайк" className={`elements__button-like ${isLiked ? `elements__button-like_enabled` : ''}`} onClick={handleLikeClick}></button>
            <div className="elements__like-counter">{card.likes.length}</div>
          </div>
      </div>
    </li>
  )
}

export default Card;