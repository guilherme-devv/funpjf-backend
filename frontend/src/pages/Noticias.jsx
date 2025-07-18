import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Search, Calendar, Eye } from 'lucide-react'
import { noticiasService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Noticias() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('publicado')

  const { data: noticias, isLoading, error, refetch } = useQuery(
    ['noticias', statusFilter],
    () => statusFilter === 'publicado' 
      ? noticiasService.getPublicadas() 
      : noticiasService.getAll(),
    { select: (response) => response.data }
  )

  const filteredNoticias = noticias?.filter(noticia =>
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.resumo.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Notícias</h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-full sm:w-48"
          >
            <option value="publicado">Publicadas</option>
            <option value="all">Todas</option>
          </select>
        </div>
      </div>

      {filteredNoticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNoticias.map((noticia) => (
            <div key={noticia.id} className="card group">
              {noticia.imagem && (
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  noticia.status === 'publicado' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {noticia.status === 'publicado' ? 'Publicado' : 'Não Publicado'}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(noticia.data_criacao).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {noticia.titulo}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {noticia.resumo}
              </p>

              <Link
                to={`/noticias/${noticia.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ler mais
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Nenhuma notícia encontrada para sua busca.' : 'Nenhuma notícia disponível.'}
          </p>
        </div>
      )}
    </div>
  )
}