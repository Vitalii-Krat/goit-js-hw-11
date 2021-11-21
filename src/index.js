import './css/styles';
import Notiflix from 'notiflix';
import { fetchImages } from './js/api';
import { getRefs } from './js/get-refs';
import { renderMarkup } from './js/renderMarkup';
import ImageApiService from './js/api';

const refs = getRefs();
const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);

function onSubmit(event) {
  event.preventDefault();
  imageApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (imageApiService.query === '') {
    return Notiflix.Notify.failure('Please write something!');
  }
  imageApiService.resetPage();
  clearImage();
  fetchPictures();
  refs.loadMoreBtn.classList.remove('is-hidden');
}

async function fetchPictures() {
  try {
    const { data, nextPage } = await imageApiService.fetchImages();
    renderMarkup(data);
    if (!nextPage) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
  } catch (error) {
    console.log("Ooops, something wrong",error.message);
  }
}
function onClick() {
  fetchPictures();
}
function clearImage() {
  refs.imageContainer.innerHTML = '';
}