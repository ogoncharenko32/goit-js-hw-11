import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('form input');
const form = document.querySelector('form');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const query = input.value;
  const images = [];

  const gallery = document.querySelector('ul');
  gallery.classList.add('gallery');
  gallery.innerHTML = '';

  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.total === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          color: '#EF4040',
          position: 'topRight',
          timeout: 4000,
          iconColor: '#fff',
          maxWidth: '432px',
        });
      } else {
        renderImages(data.hits);
      }
    })
    .catch(error => {
      iziToast.show({
        message: error.stack,
        messageColor: '#fff',
        color: '#EF4040',
        position: 'topCenter',
        timeout: 5000,
      });
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
});
