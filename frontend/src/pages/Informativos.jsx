import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Info } from 'lucide-react'
import { informativosService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Informativos() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: informativos, isLoading, error, refetch } = useQuery(
    'informativos',
    () => informativosService.getAll(),
    { select: (response) => response.data }
  )

  const filteredInformativos = informativos?.filter(informativo =>
    informativo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    informativo.periodo.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Informativos</h1>
        <p className="text-gray-600 mb-6">
          Acesse os informativos periódicos do Fundo Previdenciário José de Freitas
        </p>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar informativos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {filteredInformativos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInformativos.map((informativo) => (
            <div key={informativo.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <Info className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  Informativo
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                {informativo.titulo}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                <strong>Período:</strong> {informativo.periodo}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Publicado em {new Date(informativo.data_criacao).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={informativo.arquivo_pdf}
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
          <Info className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm 
              ? 'Nenhum informativo encontrado para sua busca.' 
              : 'Nenhum informativo disponível no momento.'}
          </p>
        </div>
      )}
    </div>
  )
}