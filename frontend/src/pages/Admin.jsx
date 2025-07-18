import { ExternalLink, Database, FileText, Settings, Users } from 'lucide-react'

export default function Admin() {
  const adminLinks = [
    {
      title: 'Django Admin',
      description: 'Painel administrativo completo do Django',
      url: '/admin/',
      icon: Settings,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'API Documentation',
      description: 'Documentação interativa da API (Swagger)',
      url: '/swagger/',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'ReDoc API',
      description: 'Documentação alternativa da API',
      url: '/redoc/',
      icon: Database,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="section-title">Painel de Administração</h1>
        <p className="text-gray-600">
          Acesse as ferramentas administrativas do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {adminLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${link.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6" />
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
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

      {/* System Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Backend</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Django 4.2 + Django REST Framework</li>
              <li>• PostgreSQL Database</li>
              <li>• JWT Authentication</li>
              <li>• Swagger/OpenAPI Documentation</li>
              <li>• Docker Containerized</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Frontend</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• React 18 + Vite</li>
              <li>• Tailwind CSS</li>
              <li>• React Query</li>
              <li>• React Router</li>
              <li>• Responsive Design</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Módulos Disponíveis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
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
  )
}