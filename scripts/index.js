// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.popup__input_el_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_el_job'); // Воспользуйтесь инструментом .querySelector()
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const userName = document.querySelector('.profile__user-name');
const userJop = document.querySelector('.profile__user-jop');

function toggleForPopup() {
	popup.classList.toggle('popup_opened');
}

function openPopup() {
	toggleForPopup();

	nameInput.value = userName.textContent;
	jobInput.value = userJop.textContent;
}

function closePopup() {
	toggleForPopup();
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM

	// Получите значение полей из свойства value
	userName.textContent = nameInput.value;
	userJop.textContent = jobInput.value;

	closePopup();
	// Выберите элементы, куда должны быть вставлены значения полей

	// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 