//Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
//Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import galleryItems from './app.js';

const refs = {
  divModalEl: document.querySelector('.js-lightbox'),
  imageModalEl: document.querySelector('.lightbox__image'),
  buttonModalEl: document.querySelector('[data-action="close-lightbox"]')
}

//Создание и рендер разметки
const galleryContainerEl = document.querySelector("ul.js-gallery");
const cardsMarkup = createImagesCardsMarkup(galleryItems);
galleryContainerEl.insertAdjacentHTML('beforeend', cardsMarkup);

function createImagesCardsMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
       >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
  }).join('');
}

//Слушатель события на клик -'click'
galleryContainerEl.addEventListener('click', openGalleryModal);
refs.divModalEl.addEventListener('click', onOverlayClick);
refs.buttonModalEl.addEventListener('click', closeGalleryModal);

//Модальное окно для полноразмерного изображения
//получаем url большого изображения и добавить на div.lightbox CSS-класс is-open
function openGalleryModal(e) {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    refs.imageModalEl.src = e.target.dataset.source;
    refs.divModalEl.classList.add('is-open');
    
//слушатель события на нажатие кнопок 
    window.addEventListener('keydown', onEscPress);
    window.addEventListener('keydown', onArrowLeftPress);
    window.addEventListener('keydown', onArrowRightPress);
 }
};

//Закрытие модального окна 
function onOverlayClick(e) {
   if (e.target === refs.divModalEl.firstElementChild) {
   closeGalleryModal();
   } 
};

function onEscPress(e) {
   if (e.code === "Escape") {
   closeGalleryModal(); 
   }
};

//Удаление событий
function closeGalleryModal(e) {
  refs.imageModalEl.src = '';
  refs.divModalEl.classList.remove('is-open');
  removeEvent();
};

function removeEvent () {
  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
};

//Пролистывание влево-вправо по кл. "ArrowRight" и "ArrowLeft"
function onArrowRightPress(e) {
  if (e.code === "ArrowRight") {
    for (let index = 0; index <= galleryItems.length; index++) {
      if (refs.imageModalEl.src === galleryItems[index].original ) {
         refs.imageModalEl.src = galleryItems[index + 1].original;
      break};
      if (refs.imageModalEl.src === galleryItems[galleryItems.length-1].original){refs.imageModalEl.src = galleryItems[0].original
      break};
    };
  };
};

function onArrowLeftPress(e) {
    if (e.code === "ArrowLeft") {
      for (let index = 0; index <= galleryItems.length; index++) {
        if (refs.imageModalEl.src === galleryItems[0].original) {
          refs.imageModalEl.src = galleryItems[galleryItems.length-1].original;
          break};
        if (refs.imageModalEl.src === galleryItems[index].original) {
          refs.imageModalEl.src = galleryItems[index - 1].original;
          break};
      };
   };
}

//  разобраться- переключение фотографий кликом в левой или правой части img

/*
('click', (e) => {
  if (x > window.visualViewport.width / 2) {
    nextImg();
  } else {
    prevImg ();
  }
});
*/