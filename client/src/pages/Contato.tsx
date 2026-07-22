import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { INSTITUTION } from '@/lib/constants'

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
      <section className="relative py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-contato-jKBMCQwZF6TThCEB2pAS6s.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">
              Fale conosco
            </p>
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-5 leading-tight text-teal-700">
              Entre em Contato
            </h1>
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Tem dúvidas? Quer agendar uma visita ou saber sobre vagas?
              Estamos prontos para ajudar sua família.
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
        <div className="absolute inset-0 bg-white/80" />
        <div className="container relative z-10">

          {/* Botão WhatsApp em destaque */}
          <div className="flex justify-center mb-12">
            <a
              href="https://wa.me/5514998443897?text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+o+CEI+Nossa+Senhora+de+F%C3%A1tima."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-poppins font-semibold rounded-xl hover:bg-green-600 transition-all text-base shadow-lg"
            >
              <MessageCircle size={22} />
              Fale conosco pelo WhatsApp: (14) 99844-3897
            </a>
          </div>

          {/* Cards de informações — dados reais de constants.ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center">
              <Phone className="w-9 h-9 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-base text-teal-700 mb-1">Telefone</h3>
              <p className="font-poppins text-gray-700 text-sm font-medium">{INSTITUTION.phone}</p>
              <p className="font-poppins text-gray-400 text-xs mt-1">Seg a Sex, 07h às 17h</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center">
              <MessageCircle className="w-9 h-9 text-green-500 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-base text-teal-700 mb-1">WhatsApp</h3>
              <a
                href="https://wa.me/5514998443897"
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-green-600 hover:text-green-700 text-sm font-medium"
              >
                (14) 99844-3897
              </a>
              <p className="font-poppins text-gray-400 text-xs mt-1">Atendimento ágil</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center">
              <Mail className="w-9 h-9 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-base text-teal-700 mb-1">E-mail</h3>
              <a
                href={`mailto:${INSTITUTION.email}`}
                className="font-poppins text-teal-600 hover:text-teal-700 text-xs font-medium break-all"
              >
                {INSTITUTION.email}
              </a>
              <p className="font-poppins text-gray-400 text-xs mt-1">Resposta em até 48h</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center">
              <Clock className="w-9 h-9 text-teal-600 mx-auto mb-3" />
              <h3 className="font-fredoka-one text-base text-teal-700 mb-1">Funcionamento</h3>
              <p className="font-poppins text-gray-700 text-sm font-medium">Seg a Sex</p>
              <p className="font-poppins text-teal-600 text-sm font-bold">06h30 às 17h30</p>
            </div>
          </div>

          {/* Endereço completo */}
          <div className="max-w-md mx-auto bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-poppins text-sm font-semibold text-gray-700">{INSTITUTION.address}</p>
              <p className="font-poppins text-sm text-gray-500">{INSTITUTION.city}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(INSTITUTION.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-xs text-teal-600 hover:text-teal-700 underline underline-offset-2 mt-1 inline-block"
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-fredoka-one text-4xl text-center mb-3 text-teal-700">
              Envie uma Mensagem
            </h2>
            <p className="font-poppins text-center text-gray-500 text-sm mb-10">
              Para retorno imediato, prefira o WhatsApp. Formulários são respondidos em até 48h.
            </p>

            {enviado && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
                <p className="font-poppins text-green-700 font-medium">✅ Mensagem enviada com sucesso! Retornaremos em breve.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 text-sm mb-2">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins text-sm"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 text-sm mb-2">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins text-sm"
                    placeholder="(14) 9 9999-9999"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 text-sm mb-2">Assunto *</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins text-sm"
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
                <label className="block font-poppins font-semibold text-gray-700 text-sm mb-2">Mensagem *</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-poppins text-sm resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-poppins font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg"
              >
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa Google Maps embutido */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-3 text-teal-700">
            Nossa Localização
          </h2>
          <p className="font-poppins text-center text-gray-500 text-sm mb-10">
            {INSTITUTION.fullAddress}
          </p>
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: '420px' }}>
            <iframe
              title="Localização CEI Nossa Senhora de Fátima – Fartura SP"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4!2d-49.5018!3d-23.3867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDIzJzEyLjEiUyA0OcKwMzAnMDYuNSJX!5e0!3m2!1spt-BR!2sbr!4v1000000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-5">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(INSTITUTION.fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-poppins text-sm font-medium underline underline-offset-4"
            >
              <MapPin size={14} />
              {INSTITUTION.fullAddress} — Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
