import { useQuery } from 'react-query'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'
import { configuracoesService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Contato() {
  const { data: config, isLoading } = useQuery(
    'configuracoes',
    () => configuracoesService.getAtual(),
    { select: (response) => response.data }
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Contato</h1>
        <p className="text-gray-600">
          Entre em contato conosco através dos canais disponíveis abaixo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações de Contato</h2>
          
          <div className="space-y-4">
            {config?.email_contato && (
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a 
                    href={`mailto:${config.email_contato}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {config.email_contato}
                  </a>
                </div>
              </div>
            )}

            {config?.telefone && (
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Telefone</p>
                  <a 
                    href={`tel:${config.telefone}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {config.telefone}
                  </a>
                </div>
              </div>
            )}

            {config?.endereco && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Endereço</p>
                  <p className="text-gray-600 whitespace-pre-line">{config.endereco}</p>
                </div>
              </div>
            )}
          </div>

          {/* Social Media */}
          {(config?.facebook || config?.instagram || config?.youtube) && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                {config?.facebook && (
                  <a
                    href={config.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {config?.instagram && (
                  <a
                    href={config.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {config?.youtube && (
                  <a
                    href={config.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Links Úteis</h2>
          
          <div className="space-y-3">
            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">Painel Administrativo</span>
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </a>
            
            <a
              href="/swagger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">Documentação da API</span>
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Horário de Funcionamento</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Segunda a Sexta:</span>
                <span>08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>08:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Sobre o {config?.nome_site || 'Fundo Previdenciário José de Freitas'}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {config?.descricao_site || 
            'O Fundo Previdenciário José de Freitas é responsável pela gestão dos recursos previdenciários dos servidores públicos municipais, garantindo transparência, segurança e sustentabilidade do sistema previdenciário local.'}
        </p>
      </div>
    </div>
  )
}