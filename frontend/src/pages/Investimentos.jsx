import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, Download, Calendar, TrendingUp, Filter } from 'lucide-react'
import { investimentosService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Investimentos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')

  const { data: investimentos, isLoading, error, refetch } = useQuery(
    'investimentos',
    () => investimentosService.getAll(),
    { select: (response) => response.data }
  )

  const categorias = [...new Set(investimentos?.map(inv => inv.categoria) || [])]

  const filteredInvestimentos = investimentos?.filter(investimento => {
    const matchesSearch = investimento.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = !categoriaFilter || investimento.categoria === categoriaFilter
    return matchesSearch && matchesCategoria
  }) || []

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Investimentos</h1>
        <p className="text-gray-600 mb-6">
          Acompanhe os documentos relacionados aos investimentos do Fundo Previdenciário
        </p>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar investimentos..."
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

      {filteredInvestimentos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestimentos.map((investimento) => (
            <div key={investimento.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 flex-shrink-0" />
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {investimento.categoria.charAt(0).toUpperCase() + investimento.categoria.slice(1)}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">
                {investimento.titulo}
              </h3>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Data: {investimento.data_formatada}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Criado em {new Date(investimento.data_criacao).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={investimento.arquivo_pdf}
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
          <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm || categoriaFilter
              ? 'Nenhum investimento encontrado para os filtros aplicados.' 
              : 'Nenhum documento de investimento disponível no momento.'}
          </p>
        </div>
      )}
    </div>
  )
}