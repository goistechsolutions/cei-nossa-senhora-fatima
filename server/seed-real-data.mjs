import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('//')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/').pop() || 'cei_db',
});

const realData = {
  contentSections: [
    {
      sectionKey: 'hero',
      title: 'Alegria Estruturada',
      subtitle: 'SEGURANÇA, APRENDIZADO, LAZER TUDO COM MUITO AMOR',
      content: 'Na CEI Nossa Senhora de Fátima, oferecemos educação infantil gratuita com excelência, transparência e muito amor. Localizada em Fartura-SP, nossa instituição filantrópica une a vivacidade infantil com estrutura pedagógica rigorosa, focando no desenvolvimento integral da primeira infância.',
      ctaText: 'Conheça Nossa História',
      ctaLink: '/historia',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-home-QpMp3MTCVAJpAXNSndTBMy.webp',
      metadata: JSON.stringify({ priority: 1, published: true }),
    },
    {
      sectionKey: 'diferenciais',
      title: 'Nossos Diferenciais Pedagógicos',
      subtitle: 'Uma educação que une qualidade, afeto estruturado e desenvolvimento integral',
      content: 'Projeto "Criança": Na nossa creche proporcionamos um ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante. Aqui, cada criança é cercada por amor e cuidado, enquanto desfruta de momentos de lazer que enriquecem sua infância.',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-cW7k5WfyJhr2um3vmtPLoD.webp',
      metadata: JSON.stringify({ priority: 2, published: true }),
    },
    {
      sectionKey: 'galeria',
      title: 'Galeria de Fotos',
      subtitle: 'Conheça os ambientes, as atividades e o dia a dia da nossa instituição',
      content: 'Explore nossa incrível galeria de fotos com momentos especiais das crianças em atividades, brincadeiras e aprendizado.',
      imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-galeria-S7FcsVcRz3iZgEzXC3aWFP.webp',
      metadata: JSON.stringify({ priority: 3, published: true }),
    },
    {
      sectionKey: 'noticias',
      title: 'Notícias e Eventos',
      subtitle: 'Fique por dentro das atividades, eventos e atualizações do CEI Nossa Senhora de Fátima',
      content: 'Acompanhe as novidades, eventos e projetos especiais da nossa instituição.',
      metadata: JSON.stringify({ priority: 4, published: true }),
    },
    {
      sectionKey: 'cta_final',
      title: 'Pronto para Fazer Parte de Nossa Comunidade?',
      subtitle: 'Entre em contato conosco para conhecer melhor o CEI Nossa Senhora de Fátima ou agende uma visita.',
      ctaText: 'Entrar em Contato',
      ctaLink: '/contato',
      metadata: JSON.stringify({ priority: 5, published: true }),
    },
    {
      sectionKey: 'footer',
      title: 'Centro de Educação Infantil Nossa Senhora de Fátima',
      content: 'Educação infantil gratuita com excelência, transparência e muito amor. Localizada em Fartura-SP.',
      metadata: JSON.stringify({ priority: 6, published: true }),
    },
  ],
  news: [
    {
      title: 'Festa Junina 2026 - Alegria e Tradição',
      description: 'Celebramos a cultura junina com as crianças! Comidas típicas, danças e muita diversão para toda a comunidade.',
      category: 'Evento',
      icon: '🎉',
      publishedAt: new Date('2026-05-28'),
      isPublished: true,
    },
    {
      title: 'Colheita da Horta Educativa',
      description: 'As crianças colheram os primeiros legumes plantados na horta! Aprendizado prático sobre sustentabilidade.',
      category: 'Projeto',
      icon: '🌽',
      publishedAt: new Date('2026-05-20'),
      isPublished: true,
    },
    {
      title: 'Novo Portal de Transparência Lançado',
      description: 'Apresentamos o novo portal de transparência com acesso fácil a documentos e relatórios institucionais.',
      category: 'Institucional',
      icon: '📊',
      publishedAt: new Date('2026-05-15'),
      isPublished: true,
    },
    {
      title: 'Capacitação Pedagógica da Equipe',
      description: 'Equipe participou de treinamento sobre metodologias inovadoras em educação infantil.',
      category: 'Desenvolvimento',
      icon: '📚',
      publishedAt: new Date('2026-05-10'),
      isPublished: true,
    },
  ],
};

try {
  console.log('🌱 Iniciando seed de dados reais...');

  // Insert content sections
  for (const section of realData.contentSections) {
    await connection.execute(
      `INSERT INTO content_sections (sectionKey, title, subtitle, content, ctaText, ctaLink, imageUrl, metadata, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       content = VALUES(content),
       ctaText = VALUES(ctaText),
       ctaLink = VALUES(ctaLink),
       imageUrl = VALUES(imageUrl),
       metadata = VALUES(metadata),
       updatedAt = NOW()`,
      [
        section.sectionKey,
        section.title,
        section.subtitle || null,
        section.content || null,
        section.ctaText || null,
        section.ctaLink || null,
        section.imageUrl || null,
        section.metadata || null,
      ]
    );
    console.log(`✅ Seção "${section.sectionKey}" inserida/atualizada`);
  }

  // Insert news
  for (const newsItem of realData.news) {
    await connection.execute(
      `INSERT INTO news (title, description, category, icon, publishedAt, isPublished, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        newsItem.title,
        newsItem.description,
        newsItem.category,
        newsItem.icon,
        newsItem.publishedAt,
        newsItem.isPublished ? 1 : 0,
      ]
    );
    console.log(`✅ Notícia "${newsItem.title}" inserida`);
  }

  console.log('✨ Seed de dados reais concluído com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('❌ Erro ao fazer seed de dados:', error);
  process.exit(1);
} finally {
  await connection.end();
}
