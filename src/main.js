import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('form input');
const submitBtn = document.querySelector('form button');
const form = document.querySelector('form');

let query = '';

input.addEventListener('input', evt => {
  query = evt.currentTarget.value;
});

submitBtn.addEventListener('click', evt => {
  evt.preventDefault();
  const images = [];

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
          timeout: 2500,
          icon: './src/img/error.svg',
          iconColor: '#fff',
          maxWidth: '432px',
        });
      } else {
        renderImages(data.hits);
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
});
