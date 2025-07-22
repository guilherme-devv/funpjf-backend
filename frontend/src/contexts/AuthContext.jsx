import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar se há token salvo ao inicializar
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
        
        // Verificar se o token ainda é válido
        authService.getProfile()
          .then(response => {
            setUser(response.data)
          })
          .catch(() => {
            // Token inválido, fazer logout
            logout()
          })
      } catch (error) {
        logout()
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await authService.login(credentials)
      const { access_token, refresh_token, user: userData } = response.data
      
      // Salvar tokens e dados do usuário
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      setUser(userData)
      setIsAuthenticated(true)
      
      toast.success('Login realizado com sucesso!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.non_field_errors?.[0] || 
                     error.response?.data?.message || 
                     'Erro ao fazer login'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        await authService.logout({ refresh_token: refreshToken })
      }
    } catch (error) {
      // Ignorar erros de logout
    } finally {
      // Limpar dados locais
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_data')
      
      setUser(null)
      setIsAuthenticated(false)
      
      toast.success('Logout realizado com sucesso!')
    }
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        throw new Error('No refresh token')
      }
      
      const response = await authService.refreshToken({ refresh_token: refreshToken })
      const { access_token } = response.data
      
      localStorage.setItem('access_token', access_token)
      return access_token
    } catch (error) {
      logout()
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}