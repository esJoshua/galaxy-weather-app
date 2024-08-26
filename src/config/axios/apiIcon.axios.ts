import axios from 'axios'
const apiIcon = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_ICON
})

export { apiIcon }
