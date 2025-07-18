import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Calendar, Filter } from 'lucide-react'
import { transparenciaService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Transparencia() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')

  const { data: documentos, isLoading, error, refetch } = useQuery(
    'transparencia',
    () => transparenciaService.getAll(),
    { select: (response) => response.data }
  )

  const categorias = [...new Set(documentos?.map(doc => doc.categoria) || [])]

  const filteredDocumentos = documentos?.filter(documento => {
    const matchesSearch = documento.titulo_documento.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = !categoriaFilter || documento.categoria === categoriaFilter
    return matchesSearch && matchesCategoria
  }) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Transparência</h1>
        <p className="text-gray-600 mb-6">
          Acesse todos os documentos de transparência do Fundo Previdenciário José de Freitas
        </p>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="input-field pl-10 w-full sm:w-48"
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredDocumentos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocumentos.map((documento) => (
            <div key={documento.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {documento.categoria.charAt(0).toUpperCase() + documento.categoria.slice(1)}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="h-4 w-4 mr-1" />
                  {documento.data_documento_formatada}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                {documento.titulo_documento}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Criado em {new Date(documento.data_criacao).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={documento.arquivo_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm || categoriaFilter 
              ? 'Nenhum documento encontrado para os filtros aplicados.' 
              : 'Nenhum documento de transparência disponível.'}
          </p>
        </div>
      )}
    </div>
  )
}