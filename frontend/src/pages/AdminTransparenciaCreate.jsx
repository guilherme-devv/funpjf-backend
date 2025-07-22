import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { ArrowLeft, Upload, FileText, Calendar, Tag, Save } from 'lucide-react'
import { transparenciaService } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AdminTransparenciaCreate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    titulo_documento: '',
    categoria: '',
    data_documento: '',
    arquivo_pdf: null
  })
  
  const [errors, setErrors] = useState({})
  const [isDragging, setIsDragging] = useState(false)

  const categoriaOptions = [
    { value: 'atas', label: 'Atas' },
    { value: 'balancetes', label: 'Balancetes' },
    { value: 'demonstrativos', label: 'Demonstrativos' },
    { value: 'relatórios', label: 'Relatórios' },
    { value: 'outros', label: 'Outros' }
  ]

  const createMutation = useMutation(
    (data) => transparenciaService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('transparencia')
        toast.success('Documento de transparência criado com sucesso!')
        navigate('/admin/dashboard')
      },
      onError: (error) => {
        const errorData = error.response?.data || {}
        setErrors(errorData)
        toast.error('Erro ao criar documento de transparência')
      }
    }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        arquivo_pdf: file
      }))
      
      if (errors.arquivo_pdf) {
        setErrors(prev => ({
          ...prev,
          arquivo_pdf: null
        }))
      }
    } else {
      toast.error('Por favor, selecione apenas arquivos PDF')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validação básica
    const newErrors = {}
    if (!formData.titulo_documento.trim()) {
      newErrors.titulo_documento = ['Este campo é obrigatório.']
    }
    if (!formData.categoria) {
      newErrors.categoria = ['Este campo é obrigatório.']
    }
    if (!formData.data_documento) {
      newErrors.data_documento = ['Este campo é obrigatório.']
    }
    if (!formData.arquivo_pdf) {
      newErrors.arquivo_pdf = ['Este campo é obrigatório.']
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    // Criar FormData para upload
    const submitData = new FormData()
    submitData.append('titulo_documento', formData.titulo_documento)
    submitData.append('categoria', formData.categoria)
    submitData.append('data_documento', formData.data_documento)
    submitData.append('arquivo_pdf', formData.arquivo_pdf)

    createMutation.mutate(submitData)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Criar Documento de Transparência
                </h1>
                <p className="text-gray-600">
                  Adicione um novo documento de transparência ao sistema
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.first_name || user?.username}
              </p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="card">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Informações do Documento
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="titulo_documento" className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Documento *
                </label>
                <input
                  type="text"
                  id="titulo_documento"
                  name="titulo_documento"
                  value={formData.titulo_documento}
                  onChange={handleInputChange}
                  className={`input-field ${errors.titulo_documento ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Digite o título do documento"
                />
                {errors.titulo_documento && (
                  <p className="mt-1 text-sm text-red-600">{errors.titulo_documento[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="h-4 w-4 inline mr-1" />
                  Categoria *
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className={`input-field ${errors.categoria ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categoriaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.categoria && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoria[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="data_documento" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Data do Documento *
                </label>
                <input
                  type="date"
                  id="data_documento"
                  name="data_documento"
                  value={formData.data_documento}
                  onChange={handleInputChange}
                  className={`input-field ${errors.data_documento ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                {errors.data_documento && (
                  <p className="mt-1 text-sm text-red-600">{errors.data_documento[0]}</p>
                )}
              </div>
            </div>
          </div>

          {/* Upload de Arquivo */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Upload className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Arquivo PDF
              </h2>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary-400 bg-primary-50'
                  : errors.arquivo_pdf
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {formData.arquivo_pdf ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <FileText className="h-12 w-12 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {formData.arquivo_pdf.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(formData.arquivo_pdf.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, arquivo_pdf: null }))}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remover arquivo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Arraste e solte o arquivo PDF aqui
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      ou clique para selecionar
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-secondary cursor-pointer"
                    >
                      Selecionar Arquivo
                    </label>
                  </div>
                </div>
              )}
            </div>
            {errors.arquivo_pdf && (
              <p className="mt-2 text-sm text-red-600">{errors.arquivo_pdf[0]}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Apenas arquivos PDF são aceitos. Tamanho máximo: 10MB
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn-secondary"
              disabled={createMutation.isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMutation.isLoading}
              className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMutation.isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Criar Documento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}