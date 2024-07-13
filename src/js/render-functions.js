import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const imageFragment = document.createDocumentFragment();

  images.forEach(img => {
    const liElem = document.createElement('li');
    liElem.classList.add('gallery-item');

    const linkElem = document.createElement('a');
    linkElem.classList.add('gallery-link');
    linkElem.href = img.largeImageURL;
    liElem.append(linkElem);

    const imgElem = document.createElement('img');
    imgElem.classList.add('gallery-image');
    imgElem.src = img.webformatURL;
    imgElem.alt = img.tags;
    imgElem.style.width = '360px';
    imgElem.style.height = '200px';

    const infoBox = document.createElement('ul');
    infoBox.classList.add('infobox');

    const createInfoItem = (headerText, value) => {
      const item = document.createElement('li');
      item.classList.add('info');

      const header = document.createElement('h2');
      header.classList.add('info-header');
      header.textContent = headerText;

      const text = document.createElement('p');
      text.classList.add('info-text');
      text.textContent = value;

      item.append(header, text);
      return item;
    };

    infoBox.append(
      createInfoItem('Likes', img.likes),
      createInfoItem('Views', img.views),
      createInfoItem('Comments', img.comments),
      createInfoItem('Downloads', img.downloads)
    );

    linkElem.append(imgElem, infoBox);
    imageFragment.append(liElem);
  });

  const gallery = document.querySelector('ul');
  gallery.classList.add('gallery');
  gallery.innerHTML = '';
  gallery.append(imageFragment);

  const lightbox = new SimpleLightbox('.gallery .gallery-link', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}
