import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", badge: 1 },
    { label: "História", href: "/historia", badge: 2 },
    {
      label: "Missão, Visão e Valores",
      href: "/missao-visao-valores",
      badge: 3,
    },
    { label: "Estrutura", href: "/estrutura", badge: 4 },
    { label: "Projetos", href: "/projetos", badge: 5 },
    { label: "Transparência", href: "/transparencia", badge: 6 },
    { label: "Contato", href: "/contato", badge: 7 },
  ];

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="container flex items-center justify-between py-4">
          {/* Logo com Border Pontilhado - Estilo B12 */}
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-green-500 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-2xl">👑</div>
                <div className="text-xs font-fredoka font-bold text-purple-600 leading-tight">
                  Nossa
                  <br />
                  Senhora
                  <br />
                  Fátima
                </div>
              </div>
            </div>
          </a>

          {/* Menu Desktop com Badges */}
          <div className="hidden md:flex items-center gap-1 lg:gap-3">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="relative font-fredoka font-semibold text-gray-700 hover:text-teal-600 transition-colors text-sm px-3 py-2 group"
              >
                <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
                {item.label}
              </a>
            ))}
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
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Linha Divisória com Gradient Rainbow */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="container py-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-teal-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
