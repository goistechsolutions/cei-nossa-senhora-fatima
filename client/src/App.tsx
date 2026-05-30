import { Router, Route } from 'wouter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Historia from '@/pages/Historia'
import MissaoVisaoValores from '@/pages/MissaoVisaoValores'
import Estrutura from '@/pages/Estrutura'
import Projetos from '@/pages/Projetos'
import Transparencia from '@/pages/Transparencia'
import Contato from '@/pages/Contato'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Route path="/" component={Home} />
          <Route path="/historia" component={Historia} />
          <Route path="/missao-visao-valores" component={MissaoVisaoValores} />
          <Route path="/estrutura" component={Estrutura} />
          <Route path="/projetos" component={Projetos} />
          <Route path="/transparencia" component={Transparencia} />
          <Route path="/contato" component={Contato} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
