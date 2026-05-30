import { useState } from 'react'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import { INSTITUTION } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo e Nome */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-14 h-14 rounded-full gradient-rainbow flex items-center justify-center text-white font-fredoka-one text-xl shadow-md">
            ✨
          </div>
          <div className="hidden md:block">
            <h1 
              className="text-lg font-fredoka-one"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {INSTITUTION.shortName}
            </h1>
            <p className="text-xs text-gray-600 font-poppins">
              Centro de Educação Infantil
            </p>
          </div>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          <a href="/" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            Home
          </a>
          
          <a href="/historia" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            História
          </a>

          <a href="/missao-visao-valores" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            Missão, Visão e Valores
          </a>

          <a href="/estrutura" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            Estrutura
          </a>

          <a href="/projetos" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            Projetos
          </a>

          <div className="relative group">
            <button className="font-fredoka font-semibold text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm">
              Transparência
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border border-gray-100">
              <a href="/transparencia" className="block px-4 py-2 hover:bg-purple-50 transition-colors">
                <p className="font-fredoka font-semibold text-sm text-gray-900">Portal Completo</p>
                <p className="text-xs text-gray-600 font-poppins">Todos os documentos</p>
              </a>
              <a href="/transparencia#institucionais" className="block px-4 py-2 hover:bg-purple-50 transition-colors">
                <p className="font-fredoka font-semibold text-sm text-gray-900">Documentos Institucionais</p>
                <p className="text-xs text-gray-600 font-poppins">Estatuto, regimentos, etc</p>
              </a>
              <a href="/transparencia#financeiros" className="block px-4 py-2 hover:bg-purple-50 transition-colors">
                <p className="font-fredoka font-semibold text-sm text-gray-900">Financeiros</p>
                <p className="text-xs text-gray-600 font-poppins">Balanços e relatórios</p>
              </a>
            </div>
          </div>

          <a href="/contato" className="font-fredoka font-semibold text-gray-700 hover:text-red-600 transition-colors text-sm">
            Contato
          </a>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} className="text-gray-700" />
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-fredoka font-semibold px-6 py-2 rounded-full hover:shadow-lg transition-all text-sm">
            Transparência
          </button>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} className="text-gray-700" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-gray-200">
          <div className="container py-4 space-y-1">
            <a href="/" className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
              Home
            </a>
            <a href="/#about" className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
              A Entidade
            </a>
            <a href="/#pillars" className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
              Pilares Pedagógicos
            </a>
            <a href="/estrutura" className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
              Diretorias
            </a>
            <a href="/transparencia" className="block px-4 py-2 font-fredoka font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              Transparência
            </a>
            <a href="/#contact" className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
              Contatos
            </a>
            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-fredoka font-semibold px-6 py-2 rounded-full hover:shadow-lg transition-all">
              Matrículas
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
