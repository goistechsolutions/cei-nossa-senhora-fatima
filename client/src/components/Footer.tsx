import { INSTITUTION, VISUAL_ASSETS } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  Lock,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Footer() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  return (
    <footer className="bg-gradient-to-b from-dark-navy via-gray-900 to-black text-white">
      {/* Ilustração de Rodapé */}
      <div className="w-full h-48 md:h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <img
          src={VISUAL_ASSETS.footerIllustration}
          alt="Comunidade de crianças e educadores"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-premium p-1 bg-gradient-premium flex items-center justify-center text-white font-fredoka-one text-sm shadow-medium">
                ✨
              </div>
              <h3 className="font-fredoka text-lg text-gradient-turquoise font-semibold">
                {INSTITUTION.shortName}
              </h3>
            </div>
            <p className="font-inter text-sm text-gray-300 leading-relaxed">
              {INSTITUTION.yearsOfExperience}+ anos de dedicação à educação
              infantil com excelência, amor e cuidado.
            </p>
          </div>

          {/* Localização */}
          <div>
            <h3 className="font-fredoka text-lg mb-4 text-rose font-semibold">
              Localização
            </h3>
            <a
              href="#"
              className="font-inter text-sm text-gray-300 hover:text-rose transition-all duration-300 flex items-start gap-2 group"
            >
              <MapPin
                size={18}
                className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <span>{INSTITUTION.address}</span>
            </a>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-fredoka text-lg mb-4 text-yellow-hope font-semibold">
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${INSTITUTION.phone}`}
                className="font-inter text-sm text-gray-300 hover:text-yellow-hope transition-all duration-300 flex items-center gap-2 group"
              >
                <Phone
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span>{INSTITUTION.phone}</span>
              </a>
              <a
                href={`mailto:${INSTITUTION.email}`}
                className="font-inter text-sm text-gray-300 hover:text-yellow-hope transition-all duration-300 flex items-center gap-2 group"
              >
                <Mail
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{INSTITUTION.email}</span>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-fredoka text-lg mb-4 text-green-growth font-semibold">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="font-inter text-sm text-gray-300 hover:text-green-growth transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-growth group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="font-inter text-sm text-gray-300 hover:text-green-growth transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-growth group-hover:scale-150 transition-transform duration-300"></span>
                  A Entidade
                </a>
              </li>
              <li>
                <a
                  href="/transparencia"
                  className="font-inter text-sm text-gray-300 hover:text-green-growth transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-growth group-hover:scale-150 transition-transform duration-300"></span>
                  Transparência
                </a>
              </li>
              <li>
                <a
                  href="/estrutura"
                  className="font-inter text-sm text-gray-300 hover:text-green-growth transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-growth group-hover:scale-150 transition-transform duration-300"></span>
                  Estrutura
                </a>
              </li>
              <li>
                <a
                  href={getLoginUrl('/admin')}
                  className="font-inter text-sm text-gray-300 hover:text-green-growth transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-growth group-hover:scale-150 transition-transform duration-300"></span>
                  Painel Administrativo
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-fredoka text-lg mb-4 text-turquoise font-semibold">
              Siga-nos
            </h3>
            <div className="flex gap-3">
              <a
                href={INSTITUTION.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-warm hover:shadow-lg-premium transition-all duration-300 p-3 rounded-full hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={INSTITUTION.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-institutional hover:shadow-lg-premium transition-all duration-300 p-3 rounded-full hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={INSTITUTION.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-premium hover:shadow-lg-premium transition-all duration-300 p-3 rounded-full hover:scale-110 transform"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Acesso Rápido - Logout */}
          {isAuthenticated && user?.role === 'admin' && (
            <div>
              <h3 className="font-fredoka text-lg mb-4 text-purple-fatima font-semibold">
                Conta
              </h3>
              <button
                onClick={async () => {
                  await logout();
                  setLocation('/');
                }}
                className="font-inter text-sm text-gray-300 hover:text-rose transition-all duration-300 flex items-center gap-2 group w-full text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose group-hover:scale-150 transition-transform duration-300"></span>
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} {INSTITUTION.shortName}. Todos os
              direitos reservados.
            </p>
            <p className="font-inter text-sm text-gray-400 flex items-center gap-1 justify-center">
              Desenvolvido com
              <Heart
                size={16}
                className="text-rose fill-rose animate-pulse-soft"
              />
              para a educação infantil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
