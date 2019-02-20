import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 3000,
  headers: {'authorization': `Bearer ${(localStorage.getItem('meetuper-jwt') || '')}`}
})

export default axiosInstance
