import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    setEnviado(true)
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-contato-jKBMCQwZF6TThCEB2pAS6s.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Entre em Contato
            </h1>
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Tem dúvidas? Quer agendar uma visita? Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-contato-ftc2Ux5hMwPinZbUvn72WF.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/75"></div>
        <div className="container relative z-10">

          {/* Botão WhatsApp em destaque */}
          <div className="flex justify-center mb-12">
            <a
              href="https://wa.me/5514998443897?text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+o+CEI+Nossa+Senhora+de+F%C3%A1tima."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-fredoka font-semibold rounded-xl hover:bg-green-600 transition-all text-lg shadow-lg"
            >
              <MessageCircle size={24} />
              Fale conosco pelo WhatsApp: (14) 99844-3897
            </a>
          </div>

          {/* Cards de informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-teal-100 text-center">
              <Phone className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-lg text-teal-600 mb-1">Telefone</h3>
              <p className="font-poppins text-gray-700 text-sm">(14) 3272-1XXX</p>
              <p className="font-poppins text-gray-500 text-xs mt-1">Seg a Sex, 7h às 17h</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-teal-100 text-center">
              <MessageCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-lg text-teal-600 mb-1">WhatsApp</h3>
              <a
                href="https://wa.me/5514998443897"
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-green-600 hover:text-green-700 text-sm font-medium"
              >
                (14) 99844-3897
              </a>
              <p className="font-poppins text-gray-500 text-xs mt-1">Atendimento ágil</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-teal-100 text-center">
              <MapPin className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-lg text-teal-600 mb-1">Endereço</h3>
              <p className="font-poppins text-gray-700 text-sm">Vila Nossa Senhora de Fátima</p>
              <p className="font-poppins text-gray-500 text-xs mt-1">Fartura – SP</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-teal-100 text-center">
              <Clock className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-lg text-teal-600 mb-1">Funcionamento</h3>
              <p className="font-poppins text-gray-700 text-sm">Seg a Sex</p>
              <p className="font-poppins text-gray-700 text-sm font-semibold">06h30 às 17h30</p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-fredoka-one text-4xl text-center mb-4 text-teal-600">
              Envie uma Mensagem
            </h2>
            <p className="font-poppins text-center text-gray-600 mb-10">
              Responderemos o mais breve possível. Para retorno imediato, use o WhatsApp.
            </p>

            {enviado && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
                <p className="font-poppins text-green-700 font-medium">✅ Mensagem enviada com sucesso! Retornaremos em breve.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins"
                    placeholder="(14) 9 9999-9999"
                  />
                </div>
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Assunto *</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="matricula">Matrícula / Vaga</option>
                    <option value="visita">Agendar Visita</option>
                    <option value="informacoes">Informações sobre o CEI</option>
                    <option value="duvida">Dúvida Pedagógica</option>
                    <option value="parceria">Parceria ou Doação</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-700 mb-2">Mensagem *</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins resize-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-fredoka font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg"
              >
                <Send size={20} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa Google Maps embutido */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-4 text-teal-600">
            Nossa Localização
          </h2>
          <p className="font-poppins text-center text-gray-600 mb-10">
            Vila Nossa Senhora de Fátima, Fartura – SP
          </p>
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: '420px' }}>
            <iframe
              title="Localização CEI Nossa Senhora de Fátima – Fartura SP"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4!2d-49.502!3d-23.386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDIzJzA5LjYiUyA0OcKwMzAnMDcuMiJX!5e0!3m2!1spt-BR!2sbr!4v1000000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.google.com/?q=CEI+Nossa+Senhora+de+Fatima+Fartura+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-poppins font-medium underline underline-offset-4"
            >
              <MapPin size={16} />
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
