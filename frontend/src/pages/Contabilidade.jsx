import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Calendar, Calculator, Filter } from 'lucide-react'
import { contabilidadeService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Contabilidade() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')

  const { data: documentos, isLoading, error, refetch } = useQuery(
    'contabilidade',
    () => contabilidadeService.getAll(),
    { select: (response) => response.data }
  )

  const tipos = [...new Set(documentos?.map(doc => doc.tipo_documento) || [])]

  const filteredDocumentos = documentos?.filter(documento => {
    const matchesSearch = documento.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = !tipoFilter || documento.tipo_documento === tipoFilter
    return matchesSearch && matchesTipo
  }) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Contabilidade</h1>
        <p className="text-gray-600 mb-6">
          Acesse os documentos contábeis do Fundo Previdenciário José de Freitas
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
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="input-field pl-10 w-full sm:w-48"
            >
              <option value="">Todos os tipos</option>
              {tipos.map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
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
              <div className="flex items-start justify-between mb-4">
                <Calculator className="h-8 w-8 text-primary-600 flex-shrink-0" />
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {documento.tipo_documento.charAt(0).toUpperCase() + documento.tipo_documento.slice(1)}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">
                {documento.titulo}
              </h3>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Data: {documento.data_formatada}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
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
          <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm || tipoFilter
              ? 'Nenhum documento encontrado para os filtros aplicados.' 
              : 'Nenhum documento contábil disponível no momento.'}
          </p>
        </div>
      )}
    </div>
  )
}