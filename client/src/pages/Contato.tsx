import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Contato() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-blue-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                📞 ENTRE EM CONTATO
              </span>
            </div>
            
            <h1 
              className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Fale Conosco
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Estamos aqui para responder suas dúvidas e ajudá-lo a conhecer melhor o CEI Nossa Senhora de Fátima.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-red-500">
              <Mail className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3">Email</h3>
              <a href="mailto:contato@ceifatima.org" className="font-poppins text-lg text-red-600 hover:text-red-700 transition-colors">
                contato@ceifatima.org
              </a>
            </div>

            {/* Telefone */}
            <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-orange-500">
              <Phone className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3">Telefone</h3>
              <a href="tel:+551430000000" className="font-poppins text-lg text-orange-600 hover:text-orange-700 transition-colors">
                (14) 3000-0000
              </a>
            </div>

            {/* Endereço */}
            <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-teal-500">
              <MapPin className="w-12 h-12 text-teal-500 mb-4" />
              <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3">Endereço</h3>
              <p className="font-poppins text-gray-700">
                Vila Nossa Senhora de Fátima<br />
                Fartura - SP
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 
              className="font-fredoka-one text-4xl text-center mb-12"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Envie uma Mensagem
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block font-fredoka font-semibold text-gray-900 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none font-poppins transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none font-poppins transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-900 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none font-poppins transition-colors"
                  placeholder="(14) 9999-9999"
                />
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-900 mb-2">
                  Assunto *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none font-poppins transition-colors"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="matricula">Matrícula</option>
                  <option value="visita">Agendar Visita</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-900 mb-2">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none font-poppins transition-colors resize-none"
                  placeholder="Sua mensagem aqui..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-fredoka font-semibold rounded-full hover:shadow-lg transition-all text-lg hover:scale-105 transform"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-teal-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-fredoka-one text-3xl text-white mb-4">
              Prefere conversar pelo WhatsApp?
            </h2>
            <p className="font-poppins text-lg text-white mb-8">
              Envie uma mensagem para nossa equipe e responderemos o mais breve possível.
            </p>
            <a
              href="https://wa.me/551430000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-fredoka font-semibold rounded-full hover:shadow-lg transition-all gap-2 text-lg hover:scale-105 transform"
            >
              <MessageCircle size={20} />
              Enviar WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
