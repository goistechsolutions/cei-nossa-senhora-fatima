import { useState } from 'react'
import { useLocation } from 'wouter'
import { Lock, AlertCircle } from 'lucide-react'

export default function TestLogin() {
  const [, setLocation] = useLocation()
  const [email, setEmail] = useState('admin@ceinossafatima.local')
  const [password, setPassword] = useState('teste123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate login - in production this would call a real authentication API
      // For testing, we accept the predefined credentials
      if (email === 'admin@ceinossafatima.local' && password === 'teste123') {
        // Store test session in localStorage
        localStorage.setItem('testUser', JSON.stringify({
          id: 1,
          name: 'Administrador Teste',
          email: 'admin@ceinossafatima.local',
          role: 'admin',
          isTestUser: true
        }))
        
        // Redirect to admin dashboard
        setLocation('/admin')
      } else {
        setError('Credenciais inválidas. Use admin@ceinossafatima.local / teste123')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise/10 via-white to-purple-fatima/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card com glassmorphism */}
        <div className="bg-white/80 backdrop-blur-md rounded-premium-lg shadow-lg-premium border border-white/20 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-turquoise to-institutional rounded-premium-lg flex items-center justify-center">
              <Lock size={32} className="text-white" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-fredoka font-bold text-center text-gray-900 mb-2">
            Acesso ao Painel
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Login de Teste para Desenvolvimento
          </p>

          {/* Erro */}
          {error && (
            <div className="mb-6 p-4 bg-rose/10 border border-rose/30 rounded-premium-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-rose flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose font-inter">{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-premium-lg border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-turquoise transition-all font-inter"
                placeholder="admin@ceinossafatima.local"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-premium-lg border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-turquoise transition-all font-inter"
                placeholder="••••••••"
              />
            </div>

            {/* Botão Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-premium-lg font-fredoka font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>

          {/* Informações de Teste */}
          <div className="mt-8 p-4 bg-institutional/10 rounded-premium-lg border border-institutional/20">
            <p className="text-xs font-inter text-gray-600 mb-2 font-semibold">
              Credenciais de Teste:
            </p>
            <div className="space-y-1 text-xs font-inter text-gray-700">
              <p><span className="font-semibold">Email:</span> admin@ceinossafatima.local</p>
              <p><span className="font-semibold">Senha:</span> teste123</p>
            </div>
          </div>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-turquoise hover:text-institutional transition-colors font-inter font-semibold"
            >
              ← Voltar para o site
            </a>
          </div>
        </div>

        {/* Aviso de Desenvolvimento */}
        <div className="mt-6 text-center text-xs text-gray-500 font-inter">
          <p>🔒 Esta página é apenas para ambiente de desenvolvimento</p>
        </div>
      </div>
    </div>
  )
}
