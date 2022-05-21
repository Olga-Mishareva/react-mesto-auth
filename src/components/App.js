import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import api from "../utils/api";
import { register, authorize, getValidData } from "../utils/auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toRemove, setToRemove] = useState(null);
  
  const [avatarForm, setAvatarForm] = useState(null); 
  const [userForm, setUserForm] = useState(null);
  const [cardForm, setCardForm] = useState(null);

  const [errorMessage, setErrorMessage] = useState({});  
  const [submitState, setSubmitState] = useState(false);
  const submitButtonState = submitState ? "" : "disabled";

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  // ============================ AVATAR ======================================

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    switchSubmitButtonState(avatarForm);
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.editUserAvatar(avatar) 
      .then(data => {
        setCurrentUser({ ...currentUser,
          userAvatar: data.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups(); 
  }

  // ============================ PROFILE ======================================

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    switchSubmitButtonState(userForm);
  }

  useEffect(() => {
    api.getUserData()
      .then(data => {
        setCurrentUser({ ...currentUser, 
          userName: data.name, 
          userInfo: data.about, 
          userAvatar: data.avatar,
          userId: data._id
        })
      })
      .catch(err => console.log(err));
  }, []);

  function handleUpdateUser(data) {
    setLoading(true);                 
    api.editUserData({ data })
      .then(data => {
        setCurrentUser({ ...currentUser,
          userName: data.name,
          userInfo: data.about
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  // ============================ CARD ======================================

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    switchSubmitButtonState(cardForm);
  }

  useEffect(() => {
    api.getUsersCards()
      .then(res => {
        const usersCards = res.map(card => {
          return {
            name: card.name,
            link: card.link,
            _id: card._id,
            likes: card.likes,
            ownerId: card.owner._id,
          }
        });
        setCards(usersCards);
      })
      .catch(err => console.log(err));
  }, []);

  function handleAddPlaceSubmit(elem) {
    setLoading(true); 
    api.addNewCard({ elem })
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser.userId);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(likedCard => {
        setCards(() => cards.map(el => {
          return el._id === likedCard._id ? likedCard : el;
        }));
        // перебираем массив cards и заменяем в стейте только одну карточку, 
        // id которой совпадает с лайкнутой картой
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setLoading(true);
    api.deleteUserCard(card._id)
      .then(res => {
        setCards(() => cards.filter(el => el._id !== card._id));
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  function handleDeleteClick(card) {
    setToRemove(card);
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

// ============================ ALL POPUPS ======================================

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setErrorMessage({});
  }

  // ============================ VALIDATION ======================================

  function setForms(form) {
    if(form.name === 'edit-avatar') setAvatarForm(form);
    if(form.name === 'edit-profile') setUserForm(form);
    if(form.name === 'add-place') setCardForm(form);
  }

  function checkInputValidity(e) {
    if(!e.currentTarget.checkValidity()) {
      setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    }
    else setErrorMessage({})
    switchSubmitButtonState(e.currentTarget);
  }
 
  function switchSubmitButtonState(form) {
    if(form.checkValidity()) {
      setSubmitState(true);
    } else setSubmitState(false);
  }

 // ===========================================================================================

  function handleRegister(password, email) {
    return register(password, email)
      .then((res) => {
        // if(res => )                 // тут показать попап 3sec
        history.push('/sign-in')
      })
      .catch(err => console.log(err)); // тут показать попап
  }

  function handleLogin(password, email) {
    return authorize(password, email)
    .then(data => {
      if(data.token) {
        localStorage.setItem('jwt', data.token);
        checkToken();
      }
      })
      .catch(err => console.log(err));
  }

  function checkToken() {
    if(localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      console.log(token)
      getValidData(token)
      .then(data => {
        setEmail(data.email);
        setLoggedIn(true);
      })
      .catch(err => console.log(err)); 
    }
  }

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn])

  
  return (
    <CurrentUserContext.Provider value={currentUser}> {/* значение, которое передается всем дочерним элементам */}
    <div className="page">
      <Header />

      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike} 
          onConfirmDelete={handleDeleteClick}/>
        </ProtectedRoute>

        {/* <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
        cards={cards}
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onCardClick={handleCardClick}
        onCardLike={handleCardLike} 
        onConfirmDelete={handleDeleteClick}>
        </ProtectedRoute> */}

        <Route path="/sign-up">
          <Register title="Регистрация" name="register" errorMessage={errorMessage}
            isValid={checkInputValidity} onRegister={handleRegister} 
            submitBtn={loading ? 'Регистрация...' : 'Зарегистрироваться'} />
        </Route>

        <Route path="/sign-in">
          <Login title="Вход" name="login" errorMessage={errorMessage} 
            isValid={checkInputValidity} onLogin={handleLogin} 
            submitBtn={loading ? 'Вход...' : 'Войти'} />
        </Route>
      </Switch>

      <EditAvatarPopup 
        onClose={closeAllPopups} 
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        onSetForms={setForms}
        isActive={submitButtonState}>
      </EditAvatarPopup>

      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        onSetForms={setForms}
        isActive={submitButtonState}>
      </EditProfilePopup>

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen}
        onAddCard={handleAddPlaceSubmit}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}
        onSetForms={setForms} 
        isActive={submitButtonState}>
      </AddPlacePopup>

      {isConfirmPopupOpen &&
        <ConfirmPopup 
          card={toRemove}
          onClose={closeAllPopups} 
          isOpen={isConfirmPopupOpen}
          onDeleteCard={handleCardDelete}
          onSetForms={setForms}
          loading={loading}>
        </ConfirmPopup>}

      {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups}
          isOpen={selectedCard ? 'popup_opened' : ''}/>
      }

      <Footer />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
