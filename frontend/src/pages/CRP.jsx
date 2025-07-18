import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Calendar, Award } from 'lucide-react'
import { crpService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function CRP() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: crps, isLoading, error, refetch } = useQuery(
    'crp',
    () => crpService.getAll(),
    { select: (response) => response.data }
  )

  const filteredCRPs = crps?.filter(crp =>
    crp.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Certificados de Regularidade Previdenciária (CRP)</h1>
        <p className="text-gray-600 mb-6">
          Acesse os Certificados de Regularidade Previdenciária emitidos pelo fundo
        </p>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar CRPs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {filteredCRPs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCRPs.map((crp) => (
            <div key={crp.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <Award className="h-8 w-8 text-primary-600 flex-shrink-0" />
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {crp.data_formatada}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">
                {crp.titulo}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Emitido em {new Date(crp.data_criacao).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={crp.arquivo_pdf}
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
          <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm 
              ? 'Nenhum CRP encontrado para sua busca.' 
              : 'Nenhum CRP disponível no momento.'}
          </p>
        </div>
      )}
    </div>
  )
}