import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
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
              Fale Conosco
            </h1>
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Quer conhecer o CEI, agendar uma visita ou tirar dúvidas sobre matrículas? Nossa equipe está pronta para te atender com carinho.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards + Horário */}
      <section className="py-20 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-contato-ftc2Ux5hMwPinZbUvn72WF.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">

          {/* Horário em destaque */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-teal-50 border border-teal-200 rounded-lg px-6 py-4 flex items-center gap-4">
              <Clock className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <p className="font-poppins text-gray-700">
                <span className="font-semibold text-teal-700">Horário de Funcionamento:</span>{' '}
                Segunda a Sexta — <strong>06h30 às 17h30</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
            {[
              {
                icone: Mail,
                titulo: 'E-mail',
                valor: 'contato@ceinossasenhora.com.br',
                href: 'mailto:contato@ceinossasenhora.com.br'
              },
              {
                icone: Phone,
                titulo: 'Telefone / WhatsApp',
                valor: '(14) 99844-3897',
                href: 'tel:+5514998443897'
              },
              {
                icone: MapPin,
                titulo: 'Endereço',
                valor: 'Vila Nossa Senhora de Fátima, Fartura — SP',
                href: 'https://maps.google.com/?q=CEI+Nossa+Senhora+de+Fatima+Fartura+SP'
              }
            ].map((item, idx) => {
              const Icon = item.icone
              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-teal-200 text-center block"
                >
                  <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-fredoka-one text-xl text-teal-600 mb-2">{item.titulo}</h3>
                  <p className="font-poppins text-gray-700">{item.valor}</p>
                </a>
              )
            })}
          </div>

          {/* Botão WhatsApp */}
          <div className="text-center mb-4">
            <a
              href="https://wa.me/5514998443897"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-fredoka font-semibold rounded-lg hover:bg-green-600 transition-all text-lg shadow-md"
            >
              💬 Conversar no WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-fredoka-one text-4xl text-center mb-4 text-teal-600">
              Envie uma Mensagem
            </h2>
            <p className="font-poppins text-center text-gray-600 mb-12">
              Responderemos em até 1 dia útil. Para urgências, use o WhatsApp.
            </p>

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
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
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
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    placeholder="(14) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Assunto *</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="matricula">Matrícula</option>
                    <option value="visita">Agendar Visita</option>
                    <option value="duvida">Dúvida Geral</option>
                    <option value="parceria">Parceria / Doação</option>
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
                  rows={6}
                  className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-fredoka font-semibold px-8 py-4 rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Send size={20} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-4 text-teal-600">
            Nossa Localização
          </h2>
          <p className="font-poppins text-center text-gray-600 mb-10">
            Vila Nossa Senhora de Fátima, Fartura — SP
          </p>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Localização CEI Nossa Senhora de Fátima — Fartura SP"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.0!2d-50.09!3d-23.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCEI+Nossa+Senhora+de+F%C3%A1tima!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.google.com/?q=CEI+Nossa+Senhora+de+Fatima+Fartura+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 font-poppins font-semibold hover:text-teal-800 transition-colors"
            >
              <MapPin size={18} />
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
