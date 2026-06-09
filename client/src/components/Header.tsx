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
    { label: "Editais", href: "/editais", badge: 7 },
    { label: "Diretoria", href: "/diretoria", badge: 8 },
    { label: "Contato", href: "/contato", badge: 9 },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-filter backdrop-blur-md sticky top-0 z-50 shadow-soft border-b border-white/20">
        <nav className="container flex items-center justify-between py-4">
          {/* Logo com Border Pontilhado - Premium */}
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-premium p-2 border-2 border-dashed border-green-growth flex items-center justify-center bg-gradient-soft-turquoise group-hover:shadow-medium transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl">👑</div>
                <div className="text-xs font-fredoka font-bold text-gradient-turquoise leading-tight">
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
                className="relative font-fredoka font-semibold text-gray-700 hover:text-turquoise transition-all duration-300 text-sm px-3 py-2 group rounded-lg hover:bg-gradient-soft-turquoise"
              >
                <span className="absolute -top-2 -left-2 bg-gradient-premium text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-medium">
                  {item.badge}
                </span>
                {item.label}
              </a>
            ))}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2 hover:bg-gradient-soft-turquoise rounded-lg transition-all duration-300">
              <Search size={20} className="text-turquoise" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gradient-soft-turquoise rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <X size={24} className="text-turquoise" />
              ) : (
                <Menu size={24} className="text-turquoise" />
              )}
            </button>
          </div>
        </nav>

        {/* Linha Divisória com Gradient Rainbow */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/80 backdrop-filter backdrop-blur-md border-t border-white/20">
            <div className="container py-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 font-fredoka font-semibold text-gray-700 hover:bg-gradient-soft-turquoise rounded-lg transition-all duration-300"
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
