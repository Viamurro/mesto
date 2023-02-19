//НАЙДЕМ ВСЕ ПОПАПЫ НА СТРАНИЦЕ
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.popup__input_el_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_el_job'); // Воспользуйтесь инструментом .querySelector()
const popups = document.querySelectorAll('.popup');
const saveButton = document.querySelector('.popup__save-button');
const userName = document.querySelector('.profile__user-name');
const userJop = document.querySelector('.profile__user-jop');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const profileForm = document.querySelector('.popup__form_profile');
const typeAddCard = document.querySelector('.popup_type_add-card');
const imgPopup = document.querySelector('.popup_image');
const titlePopup = imgPopup.querySelector('.popup__text');
const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('.template-card');
const popupActiveClass = 'popup_is-opened';

// ИНИЦИЛИЗАЦИЯ LISTENERS ДЛЯ CARD
function addCardListeners(card, cardData) {
	card.querySelector('.element__like-button').addEventListener('click', activeLikeBtn);
	card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
	card.querySelector('.element__photo').addEventListener("click", () => {
		openPopupCardShow(cardData);
	});
}

const formAddNewCard = popupAddCard.querySelector('.popup__form');
formAddNewCard.addEventListener('submit', addCard);
const cardElement = document.querySelector('.template-card').content;

// СОЗДАНИЕ CARD
function createCard(data) {
	const newCard = cardElement.querySelector('.element').cloneNode(true);
	const elementImage = newCard.querySelector('.element__photo');

	elementImage.src = data.link;
	elementImage.alt = data.name;

	newCard.querySelector('.element__title').textContent = data.name;

	addCardListeners(newCard, data);
	return newCard;
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ
function fillProfile() {
	userName.textContent = nameInput.value;
	userJop.textContent = jobInput.value;
}

function fillProfileInputs() {
	nameInput.value = userName.textContent;
	jobInput.value = userJop.textContent;
	showPopup(popupEditProfile);
}

// ДОБАВЛЕНИЕ CARD
function addTemplateCard(data) {
	const cardClone = createCard(data)
	cardsContainer.prepend(cardClone);
}

function addCard(event) {
	event.preventDefault();
	const cardName = event.target.querySelector('#typePlace').value;
	const cardLink = event.target.querySelector('#typeUrl').value;
	addTemplateCard({ name: cardName, link: cardLink });
	event.target.reset();
	hidePopup(popupAddCard);
}

// ИНИЦИАЛИЗАЦИЯ НАЧАЛЬНЫХ ЗНАЧЕНИЙ CARDS
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

// ИНИЦИЛИЗАЦИЯ CARDS
initialCards.map(addTemplateCard);

// СДЕЛАЕМ ИТЕРАЦИЮ ПО ВСЕМ ПОПАПАМ И ПОВЕСИМ ОПРЕДЕЛЕННЫЕ СОБЫТИЯ НА ЕЛЕМЕНТЫ
popups.forEach(popup => {
	// ДЛЯ КНОПКИ ЗАКРЫТЬ ДОБАВИМ КЛАСС hidePopup
	const btnClose = popup.querySelector('.popup__close-button');
	btnClose.addEventListener('click', () => hidePopup(popup))
})

// ФУНКЦИЯ ДЛЯ УДАЛЕНИЕ И ДОБАВЛЕНИЯ КЛАССА В ОТКРЫТЫХ ПОПАПАХ
function showPopup(/** HTMLElement*/ popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', closeByEsc);
}

function hidePopup(/** HTMLElement*/ popup) {
	popup.classList.remove(popupActiveClass);
	document.removeEventListener('keydown', closeByEsc);
}

const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const imgButton = document.querySelector('.element__photo');

addCardButton.addEventListener('click', () => showPopup(popupAddCard));
editButton.addEventListener('click', fillProfileInputs);

// ЗАКРЫТИЕ ПОПАПА НАЖАТИЕМ НА ESC
function closeByEsc(event) {
	if (event.key === "Escape") {
		const popupOpened = document.querySelector('.popup_is-opened');
		hidePopup(popupOpened);
	}
}

// ФУНКЦИЯ ОТКРЫТИЯ ФОТОГРАФИИ В РЕЖИМЕ ПРОСМОТРА
const elImg = imgPopup.querySelector('img');

function openPopupCardShow(cardData) {
	elImg.src = cardData.link;
	elImg.alt = cardData.name;
	titlePopup.textContent = cardData.name;
	showPopup(imgPopup);
};

profileForm.addEventListener('submit', function (event) {
	event.preventDefault();
	fillProfile();
	hidePopup(popupEditProfile);
});

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(event) {
	const card = event.target.closest('.element');
	card.remove();
}

// ПОСТАВИТЬ ЛАЙК
function activeLikeBtn(event) {
	const likeBtn = event.target
	likeBtn.classList.toggle('element__like-button_active');
}

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
popups.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains(popupActiveClass)) {
			hidePopup(popup);
		}
	})
})