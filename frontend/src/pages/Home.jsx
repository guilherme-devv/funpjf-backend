import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Calendar, FileText, Award, TrendingUp, ExternalLink } from 'lucide-react'
import { noticiasService, certificacoesService, configuracoesService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Home() {
  const { data: noticias, isLoading: loadingNoticias } = useQuery(
    'noticias-publicadas',
    () => noticiasService.getPublicadas(),
    { select: (response) => response.data.slice(0, 3) }
  )

  const { data: certificacoes, isLoading: loadingCertificacoes } = useQuery(
    'certificacoes-validas',
    () => certificacoesService.getValidas(),
    { select: (response) => response.data.slice(0, 3) }
  )

  const { data: config } = useQuery(
    'configuracoes',
    () => configuracoesService.getAtual(),
    { select: (response) => response.data }
  )

  const stats = [
    { name: 'Documentos de Transparência', value: '150+', icon: FileText, href: '/transparencia' },
    { name: 'Certificações Válidas', value: '12', icon: Award, href: '/certificacoes' },
    { name: 'Relatórios Contábeis', value: '48', icon: TrendingUp, href: '/contabilidade' },
    { name: 'CRPs Emitidos', value: '24', icon: Calendar, href: '/crp' },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {config?.nome_site || 'Fundo Previdenciário José de Freitas'}
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              {config?.descricao_site || 'Transparência, segurança e compromisso com o futuro dos servidores públicos de José de Freitas'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/transparencia" className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Ver Transparência
              </Link>
              <Link to="/certificacoes" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Certificações
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link
                key={stat.name}
                to={stat.href}
                className="card hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-primary-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Latest News */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Últimas Notícias</h2>
            <Link to="/noticias" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              Ver todas
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loadingNoticias ? (
            <LoadingSpinner />
          ) : noticias?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noticias.map((noticia) => (
                <Link
                  key={noticia.id}
                  to={`/noticias/${noticia.id}`}
                  className="card hover:shadow-md transition-shadow duration-200 group"
                >
                  {noticia.imagem && (
                    <img
                      src={noticia.imagem}
                      alt={noticia.titulo}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {noticia.resumo}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(noticia.data_criacao).toLocaleDateString('pt-BR')}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma notícia disponível no momento.</p>
            </div>
          )}
        </div>

        {/* Valid Certifications */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Certificações Válidas</h2>
            <Link to="/certificacoes" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              Ver todas
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loadingCertificacoes ? (
            <LoadingSpinner />
          ) : certificacoes?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificacoes.map((cert) => (
                <div key={cert.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <Award className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      Válido
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {cert.titulo_certificacao}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Emissor: {cert.orgao_emissor}
                  </p>
                  <p className="text-xs text-gray-500">
                    Válido até: {cert.valido_ate_formatado}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma certificação válida encontrada.</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-gray-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Acesso Rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin" className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
              <ExternalLink className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Admin Django</span>
            </Link>
            <Link to="/swagger" className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
              <FileText className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">API Docs</span>
            </Link>
            <Link to="/contato" className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
              <Calendar className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Contato</span>
            </Link>
            <Link to="/informativos" className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
              <FileText className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Informativos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}