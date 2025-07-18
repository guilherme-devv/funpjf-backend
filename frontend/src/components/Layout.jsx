import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Home, 
  Newspaper, 
  FileText, 
  Award, 
  Calculator, 
  TrendingUp, 
  Info, 
  Phone,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Notícias', href: '/noticias', icon: Newspaper },
  { name: 'Transparência', href: '/transparencia', icon: FileText },
  { name: 'CRP', href: '/crp', icon: Award },
  { name: 'Certificações', href: '/certificacoes', icon: Award },
  { name: 'Contabilidade', href: '/contabilidade', icon: Calculator },
  { name: 'Investimentos', href: '/investimentos', icon: TrendingUp },
  { name: 'Informativos', href: '/informativos', icon: Info },
  { name: 'Contato', href: '/contato', icon: Phone },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Menu</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            <Link
              to="/admin-panel"
              className={`sidebar-link ${location.pathname === '/admin-panel' ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              Administração
            </Link>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-600">
              Fundo Previdenciário
            </h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            <Link
              to="/admin-panel"
              className={`sidebar-link ${location.pathname === '/admin-panel' ? 'active' : ''}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Administração
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="page-header lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Fundo Previdenciário José de Freitas
            </h1>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}