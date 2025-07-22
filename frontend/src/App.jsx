import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Noticias from './pages/Noticias'
import NoticiaDetalhes from './pages/NoticiaDetalhes'
import Transparencia from './pages/Transparencia'
import CRP from './pages/CRP'
import Certificacoes from './pages/Certificacoes'
import Contabilidade from './pages/Contabilidade'
import Investimentos from './pages/Investimentos'
import Informativos from './pages/Informativos'
import Contato from './pages/Contato'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Rotas protegidas do admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Rotas públicas do site */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<NoticiaDetalhes />} />
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/crp" element={<CRP />} />
            <Route path="/certificacoes" element={<Certificacoes />} />
            <Route path="/contabilidade" element={<Contabilidade />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/informativos" element={<Informativos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/admin-panel" element={<Admin />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  )
}

export default App