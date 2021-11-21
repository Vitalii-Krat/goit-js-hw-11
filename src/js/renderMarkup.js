import { getRefs } from './get-refs';
import Notiflix from 'notiflix';
const refs = getRefs();

export function renderMarkup(pict) {
  const pictArray = pict.data.hits;
  if (pictArray.length === 0) {
    Notiflix.Notify.failure(
      'There are no images on your search query');}
  else {
    const renderMarkup = pictArray
      .map(
          ({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<a class="card-link" href="${webformatURL}">
      <div class="photo-card">
      <div class="thumb">
        <img class="photo" src="${webformatURL}" alt="${tags}"  loading="lazy" />
      </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div>
      </a>`;
      })
      .join('');
    refs.imageContainer.insertAdjacentHTML('beforeend', renderMarkup);
  }
}