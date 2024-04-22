import axios from 'axios';

export const fetchCharacters = (page: string = 'https://rickandmortyapi.com/api/character') => {
  return axios.get(page);
}