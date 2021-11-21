import axios from 'axios';

const BASE_URl = 'https://pixabay.com/api/';
const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';
const OPTIONS = "image_type=photo&orientation=horizontal&safesearch=true"
const PER_PAGE = 40;

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
      this.pageSize = PER_PAGE;
    this.totalHits = null;
  }
  
  async fetchImages() {
    const url = `${BASE_URl}?${API_KEY}&q=${this.searchQuery}&${OPTIONS}&per_page=${this.pageSize}&page=${this.page}`;
    this.incrementPage();
    const data = await axios.get(url);
    return { data, nextPage: this.page <= Math.ceil(300 / this.pageSize) };
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

