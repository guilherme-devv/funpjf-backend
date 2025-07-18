import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor para adicionar token se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Redirecionar para login se necessário
    }
    return Promise.reject(error)
  }
)

// Serviços da API
export const noticiasService = {
  getAll: () => api.get('/noticias/'),
  getPublicadas: () => api.get('/noticias/publicadas/'),
  getById: (id) => api.get(`/noticias/${id}/`),
  create: (data) => api.post('/noticias/', data),
  update: (id, data) => api.put(`/noticias/${id}/`, data),
  delete: (id) => api.delete(`/noticias/${id}/`),
}

export const transparenciaService = {
  getAll: () => api.get('/transparencia/'),
  getById: (id) => api.get(`/transparencia/${id}/`),
  create: (data) => api.post('/transparencia/', data),
  update: (id, data) => api.put(`/transparencia/${id}/`, data),
  delete: (id) => api.delete(`/transparencia/${id}/`),
}

export const crpService = {
  getAll: () => api.get('/crp/'),
  getById: (id) => api.get(`/crp/${id}/`),
  create: (data) => api.post('/crp/', data),
  update: (id, data) => api.put(`/crp/${id}/`, data),
  delete: (id) => api.delete(`/crp/${id}/`),
}

export const certificacoesService = {
  getAll: () => api.get('/certificacoes/'),
  getValidas: () => api.get('/certificacoes/validas/'),
  getById: (id) => api.get(`/certificacoes/${id}/`),
  create: (data) => api.post('/certificacoes/', data),
  update: (id, data) => api.put(`/certificacoes/${id}/`, data),
  delete: (id) => api.delete(`/certificacoes/${id}/`),
}

export const contabilidadeService = {
  getAll: () => api.get('/contabilidade/'),
  getById: (id) => api.get(`/contabilidade/${id}/`),
  create: (data) => api.post('/contabilidade/', data),
  update: (id, data) => api.put(`/contabilidade/${id}/`, data),
  delete: (id) => api.delete(`/contabilidade/${id}/`),
}

export const investimentosService = {
  getAll: () => api.get('/investimentos/'),
  getById: (id) => api.get(`/investimentos/${id}/`),
  create: (data) => api.post('/investimentos/', data),
  update: (id, data) => api.put(`/investimentos/${id}/`, data),
  delete: (id) => api.delete(`/investimentos/${id}/`),
}

export const informativosService = {
  getAll: () => api.get('/informativos/'),
  getById: (id) => api.get(`/informativos/${id}/`),
  create: (data) => api.post('/informativos/', data),
  update: (id, data) => api.put(`/informativos/${id}/`, data),
  delete: (id) => api.delete(`/informativos/${id}/`),
}

export const configuracoesService = {
  getAtual: () => api.get('/configuracoes/atual/'),
  atualizar: (data) => api.post('/configuracoes/atualizar/', data),
}

export default api