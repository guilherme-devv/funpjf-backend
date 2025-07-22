import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Calendar,
  FileText,
  Eye
} from 'lucide-react'
import { transparenciaService } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function AdminTransparenciaList() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const { data: documentos, isLoading, error, refetch } = useQuery(
    'admin-transparencia',
    () => transparenciaService.getAll(),
    { select: (response) => response.data }
  )

  const deleteMutation = useMutation(
    (id) => transparenciaService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-transparencia')
        toast.success('Documento excluído com sucesso!')
        setDeleteConfirm(null)
      },
      onError: () => {
        toast.error('Erro ao excluir documento')
      }
    }
  )

  const categorias = [...new Set(documentos?.map(doc => doc.categoria) || [])]

  const filteredDocumentos = documentos?.filter(documento => {
    const matchesSearch = documento.titulo_documento.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = !categoriaFilter || documento.categoria === categoriaFilter
    return matchesSearch && matchesCategoria
  }) || []

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gerenciar Transparência
              </h1>
              <p className="text-gray-600">
                Gerencie os documentos de transparência do sistema
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name || user?.username}
                </p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <Link
                to="/admin/transparencia/create"
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Documento
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{documentos?.length || 0}</p>
                <p className="text-sm text-gray-600">Total de Documentos</p>
              </div>
            </div>
          </div>
          {categorias.slice(0, 3).map(categoria => (
            <div key={categoria} className="card">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {documentos?.filter(doc => doc.categoria === categoria).length || 0}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{categoria}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documents List */}
        {filteredDocumentos.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocumentos.map((documento) => (
                    <tr key={documento.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {documento.titulo_documento}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {documento.categoria.charAt(0).toUpperCase() + documento.categoria.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {documento.data_documento_formatada}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(documento.data_criacao).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={documento.arquivo_pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                            title="Visualizar PDF"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <a
                            href={documento.arquivo_pdf}
                            download
                            className="text-green-600 hover:text-green-700"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <Link
                            to={`/admin/transparencia/edit/${documento.id}`}
                            className="text-primary-600 hover:text-primary-700"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(documento)}
                            className="text-red-600 hover:text-red-700"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || categoriaFilter
                ? 'Nenhum documento encontrado para os filtros aplicados.'
                : 'Nenhum documento de transparência cadastrado.'}
            </p>
            <Link
              to="/admin/transparencia/create"
              className="btn-primary mt-4 inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Documento
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Trash2 className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Confirmar Exclusão
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o documento "{deleteConfirm.titulo_documento}"? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary"
                disabled={deleteMutation.isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50"
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Excluindo...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}