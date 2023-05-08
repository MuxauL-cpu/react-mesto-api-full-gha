import { useContext } from 'react';

import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ openUserPicture, openEdit, openAddCard, openCard, openDelete, cards, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={openUserPicture}>
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар профиля" />
        </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="Редактирование профиля" className="profile__button" onClick={openEdit}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button type="button" aria-label="Добавить новую картинку" className="profile__button-add" onClick={openAddCard}></button>
        </section>
        <section className="photo-grid">
          <ul className="photo-grid__list">
            {cards.map((card) => (
              <Card 
                key={card._id}
                card={card}
                openCard={openCard}
                deleteClick={openDelete}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </section>
      </main>
  );
}

export default Main;