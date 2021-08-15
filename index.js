import { galleryItems } from './js/app.js';
import { refs } from './js/refs.js';

createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  const item = galleryItems.map(
    ({ preview, original, description }) => `<li class="gallery__item">
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
`,
  );

  refs.gallery.innerHTML = item.join('');
}

refs.gallery.addEventListener('click', onImgClick);

function onImgClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();
  onOpenModal();
  refs.modalImg.setAttribute('src', `${e.target.dataset.source}`);
  refs.modalImg.setAttribute('alt', `${e.target.getAttribute('alt')}`);
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  }
  onCloseModal();
}

function onCloseBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  onCloseModal();
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onRightPress(e) {
  if (e.code === 'ArrowRight') {
    sliderRight();
  }
}

function onLeftPress(e) {
  if (e.code === 'ArrowLeft') {
    sliderLeft();
  }
}

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.setAttribute('src', '');
  refs.modalImg.setAttribute('alt', '');
  refs.backdrop.removeEventListener('click', onBackdropClick);
  refs.closeBtn.removeEventListener('click', onCloseBtnClick);
  refs.gallery.addEventListener('click', onImgClick);
  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onRightPress);
  window.removeEventListener('keydown', onLeftPress);
}

function onOpenModal() {
  refs.modal.classList.add('is-open');
  refs.gallery.removeEventListener('click', onImgClick);
  refs.backdrop.addEventListener('click', onBackdropClick);
  refs.closeBtn.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onRightPress);
  window.addEventListener('keydown', onLeftPress);
}

function sliderRight() {
  for (let i = 0; i < galleryItems.length; i++) {
    if (refs.modalImg.getAttribute('src') === galleryItems[i].original) {
      if (i === galleryItems.length - 1) {
        i = 0;
        refs.modalImg.setAttribute('src', `${galleryItems[i].original}`);
      } else {
        i += 1;
        refs.modalImg.setAttribute('src', `${galleryItems[i].original}`);
      }
    }
  }
}

function sliderLeft() {
  for (let i = 0; i < galleryItems.length; i++) {
    if (refs.modalImg.getAttribute('src') === galleryItems[i].original) {
      if (i === 0) {
        i = galleryItems.length - 1;
        refs.modalImg.setAttribute('src', `${galleryItems[i].original}`);
      } else {
        i -= 1;
        refs.modalImg.setAttribute('src', `${galleryItems[i].original}`);
      }
    }
  }
}
