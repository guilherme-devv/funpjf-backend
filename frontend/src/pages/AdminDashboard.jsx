import { useAuth } from '../contexts/AuthContext'
import { useQuery } from 'react-query'
import { 
  Users, 
  FileText, 
  Award, 
  TrendingUp, 
  LogOut,
  Settings,
  Database,
  ExternalLink
} from 'lucide-react'
import { 
  noticiasService, 
  transparenciaService, 
  certificacoesService,
  crpService 
} from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AdminDashboard() {
  const { user, logout } = useAuth()

  // Queries para estatísticas
  const { data: noticias } = useQuery('admin-noticias', () => noticiasService.getAll())
  const { data: transparencia } = useQuery('admin-transparencia', () => transparenciaService.getAll())
  const { data: certificacoes } = useQuery('admin-certificacoes', () => certificacoesService.getAll())
  const { data: crps } = useQuery('admin-crps', () => crpService.getAll())

  const stats = [
    {
      name: 'Total de Notícias',
      value: noticias?.data?.length || 0,
      icon: FileText,
      color: 'bg-blue-600'
    },
    {
      name: 'Documentos Transparência',
      value: transparencia?.data?.length || 0,
      icon: Database,
      color: 'bg-green-600'
    },
    {
      name: 'Certificações',
      value: certificacoes?.data?.length || 0,
      icon: Award,
      color: 'bg-purple-600'
    },
    {
      name: 'CRPs Emitidos',
      value: crps?.data?.length || 0,
      icon: TrendingUp,
      color: 'bg-orange-600'
    }
  ]

  const adminLinks = [
    {
      title: 'Django Admin',
      description: 'Painel administrativo completo',
      url: '/admin/',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      title: 'API Documentation',
      description: 'Documentação da API (Swagger)',
      url: '/swagger/',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Site Público',
      description: 'Visualizar site público',
      url: '/',
      icon: ExternalLink,
      color: 'bg-primary-600 hover:bg-primary-700'
    }
  ]

  const handleLogout = async () => {
    await logout()
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-gray-600">
                Fundo Previdenciário José de Freitas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name || user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.is_superuser ? 'Super Administrador' : 'Administrador'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-900 mb-2">
            Bem-vindo, {user?.first_name || user?.username}!
          </h2>
          <p className="text-primary-700">
            Você está logado como administrador do sistema. Use os links abaixo para gerenciar o conteúdo.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="card">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Admin Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.title}
                href={link.url}
                target={link.url.startsWith('/') && link.url !== '/' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="card hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${link.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {link.url.startsWith('/') && link.url !== '/' && (
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {link.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {link.description}
                </p>
              </a>
            )
          })}
        </div>

        {/* System Info */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Informações do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Usuário Atual</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Username: {user?.username}</li>
                <li>• Email: {user?.email || 'Não informado'}</li>
                <li>• Tipo: {user?.is_superuser ? 'Super Admin' : 'Admin'}</li>
                <li>• Status: {user?.is_active ? 'Ativo' : 'Inativo'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Módulos Disponíveis</h3>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                <span>• Notícias</span>
                <span>• Transparência</span>
                <span>• CRP</span>
                <span>• Certificações</span>
                <span>• Contabilidade</span>
                <span>• Investimentos</span>
                <span>• Informativos</span>
                <span>• Configurações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}