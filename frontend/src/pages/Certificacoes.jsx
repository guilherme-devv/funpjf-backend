import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Calendar, Award, AlertCircle } from 'lucide-react'
import { certificacoesService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Certificacoes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: certificacoes, isLoading, error, refetch } = useQuery(
    'certificacoes',
    () => certificacoesService.getAll(),
    { select: (response) => response.data }
  )

  const filteredCertificacoes = certificacoes?.filter(cert => {
    const matchesSearch = cert.titulo_certificacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.orgao_emissor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Certificações</h1>
        <p className="text-gray-600 mb-6">
          Visualize todas as certificações do Fundo Previdenciário e seus status de validade
        </p>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar certificações..."
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
            <option value="all">Todos os status</option>
            <option value="valido">Válidas</option>
            <option value="expirado">Expiradas</option>
          </select>
        </div>
      </div>

      {filteredCertificacoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificacoes.map((cert) => (
            <div key={cert.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                {cert.status === 'valido' ? (
                  <Award className="h-8 w-8 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                )}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  cert.status === 'valido' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {cert.status_display}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                {cert.titulo_certificacao}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3">
                <strong>Órgão Emissor:</strong> {cert.orgao_emissor}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Válido até: {cert.valido_ate_formatado}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Adicionado em {new Date(cert.data_criacao).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={cert.arquivo_pdf}
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
            {searchTerm || statusFilter !== 'all'
              ? 'Nenhuma certificação encontrada para os filtros aplicados.' 
              : 'Nenhuma certificação disponível no momento.'}
          </p>
        </div>
      )}
    </div>
  )
}