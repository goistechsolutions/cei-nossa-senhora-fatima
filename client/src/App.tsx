import { Router, Route } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Historia from "@/pages/Historia";
import MissaoVisaoValores from "@/pages/MissaoVisaoValores";
import Estrutura from "@/pages/Estrutura";
import Projetos from "@/pages/Projetos";
import Transparencia from "@/pages/Transparencia";
import Editais from "@/pages/Editais";
import Contato from "@/pages/Contato";
import AdminNews from "@/pages/admin/AdminNews";
import AdminContent from "@/pages/admin/AdminContent";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminDocuments from "@/pages/admin/AdminDocuments";

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
          <Route path="/editais" component={Editais} />
          <Route path="/contato" component={Contato} />
          <Route path="/admin/news" component={AdminNews} />
          <Route path="/admin/content" component={AdminContent} />
          <Route path="/admin/gallery" component={AdminGallery} />
          <Route path="/admin/documents" component={AdminDocuments} />
          <Route path="/admin" component={AdminDashboard} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
