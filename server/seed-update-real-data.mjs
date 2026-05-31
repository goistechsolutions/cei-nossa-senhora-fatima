import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const url = new URL(dbUrl);

const connection = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port || '4000'),
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.replace('/', ''),
  ssl: {}
});

console.log('✅ Conectado ao banco de dados');

// Atualizar seção HERO com dados reais do site
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    cta = ?,
    ctaLink = ?,
    metadata = ?
  WHERE sectionKey = 'hero'`,
  [
    'Projeto "Criança"',
    'Na nossa creche proporcionamos um ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante. Aqui, cada criança é cercada por amor e cuidado, enquanto desfruta de momentos de lazer que enriquecem sua infância. No Projeto "Criança", nosso compromisso é garantir que todas as crianças cresçam felizes, saudáveis e confiantes.',
    'SEGURANÇA, APRENDIZADO, LAZER TUDO COM MUITO AMOR',
    'Centro de Educação Infantil Nossa Senhora de Fátima - Fartura/SP. Educação infantil gratuita com excelência, transparência e muito amor.',
    'Conheça Nossa História',
    '/historia',
    JSON.stringify({
      slogan: 'SEGURANÇA, APRENDIZADO, LAZER TUDO COM MUITO AMOR',
      projeto: 'Projeto "Criança"',
      endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
      telefone: '(14) 3382-1327',
      whatsapp: '(14) 99844-3897',
      email: 'ceinsffartura@yahoo.com.br',
      horario: 'Segunda-Sexta: 06:30 às 17:30hs',
      inep: '38438558',
      cme: '03',
      cmdca: '06'
    })
  ]
);
console.log('✅ Seção HERO atualizada');

// Atualizar seção MISSÃO/VISÃO/VALORES com dados reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'missao_visao_valores'`,
  [
    'Missão, Visão e Valores',
    'Missão: Educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos, desde o físico, o psicológico, o intelectual e social, e ainda complementando-se com a ação familiar e comunidade.\n\nVisão: Compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania que reflita na qualidade de formação do ser humano que interage ativamente com o meio em que vive.\n\nValores: Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança, Diálogo, Tolerância, Criatividade, Cooperação, Compaixão, Generosidade, Amizade, Liberdade.',
    'Nossos Pilares Institucionais',
    'Possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças, o cognitivo, o físico e o socioemocional, funções especificamente humanas.',
    JSON.stringify({
      missao: 'Educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos, desde o físico, o psicológico, o intelectual e social, e ainda complementando-se com a ação familiar e comunidade.',
      visao: 'Compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania que reflita na qualidade de formação do ser humano que interage ativamente com o meio em que vive.',
      valores: 'Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança, Diálogo, Tolerância, Criatividade, Cooperação, Compaixão, Generosidade, Amizade, Liberdade',
      objetivos: 'Possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças, o cognitivo, o físico e o socioemocional, funções especificamente humanas, estabelecendo relações entre as diferentes linguagens e áreas do conhecimento.'
    })
  ]
);
console.log('✅ Seção MISSÃO/VISÃO/VALORES atualizada');

// Atualizar seção PROJETO CRIANÇA com dados reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'projeto_crianca'`,
  [
    'Projeto "Criança"',
    'Na nossa creche proporcionamos um ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante. Aqui, cada criança é cercada por amor e cuidado, enquanto desfruta de momentos de lazer que enriquecem sua infância. No Projeto "Criança", nosso compromisso é garantir que todas as crianças cresçam felizes, saudáveis e confiantes.',
    'SEGURANÇA, APRENDIZADO, LAZER TUDO COM MUITO AMOR',
    'O Projeto "Criança" é o programa pedagógico central da CEI Nossa Senhora de Fátima, fundamentado na tríade: segurança, aprendizado e lazer.',
    JSON.stringify({
      pilares: ['Segurança', 'Aprendizado', 'Lazer'],
      lema: 'Tudo com muito amor',
      foco: 'Desenvolvimento integral da criança'
    })
  ]
);
console.log('✅ Seção PROJETO CRIANÇA atualizada');

// Atualizar seção DIFERENCIAIS com dados reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'diferenciais'`,
  [
    'Nossos Diferenciais',
    'Objetivos: Possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças, o cognitivo, o físico e o socioemocional, funções especificamente humanas.\n\nMissão: Educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos.\n\nVisão: Compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania.\n\nValores: Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança, Diálogo, Tolerância, Criatividade, Cooperação, Compaixão, Generosidade, Amizade, Liberdade.',
    'Pilares da Nossa Educação',
    'Uma educação que une qualidade, afeto estruturado e desenvolvimento integral',
    JSON.stringify({
      cards: [
        { titulo: 'Objetivos', descricao: 'Possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças', icone: '🎯' },
        { titulo: 'Missão', descricao: 'Educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos', icone: '🎓' },
        { titulo: 'Visão', descricao: 'Compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania', icone: '👁️' },
        { titulo: 'Valores', descricao: 'Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança', icone: '💎' }
      ]
    })
  ]
);
console.log('✅ Seção DIFERENCIAIS atualizada');

// Atualizar seção ATENDIMENTO com estatísticas reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'atendimento'`,
  [
    'Atendimento',
    'O Centro de Educação Infantil "Nossa Senhora de Fátima" atende crianças da primeira infância em período integral, de segunda a sexta-feira, das 06:30 às 17:30hs. Funciona em sede própria na Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura/SP.',
    'Nossos Números',
    'Atendimento integral com dedicação e profissionalismo',
    JSON.stringify({
      estatisticas: {
        alunos_matriculados: 125,
        dias_letivos: 200,
        educadores: 19,
        anos_experiencia: 47
      },
      horario: {
        segunda_sexta: '06:30 às 17:30hs',
        sabado: 'Fechado',
        domingo: 'Fechado'
      },
      contatos: {
        endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
        telefone: '(14) 3382-1327',
        whatsapp: '(14) 99844-3897',
        email: 'ceinsffartura@yahoo.com.br'
      },
      registros: {
        cme: '03',
        cmdca: '06',
        inep: '38438558',
        sede_propria: true
      }
    })
  ]
);
console.log('✅ Seção ATENDIMENTO atualizada');

// Atualizar seção FOOTER com dados reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'footer'`,
  [
    'CEI Nossa Senhora de Fátima',
    'O Centro de Educação Infantil "Nossa Senhora de Fátima", é um estabelecimento de ensino que possui inscrição no CME nº 03 e no CMDCA nº 06, com o código de INEP: 38438558, funciona em sede própria.',
    'Centro de Educação Infantil Nossa Senhora de Fátima',
    'Educação infantil gratuita com excelência, transparência e muito amor.',
    JSON.stringify({
      endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
      telefone: '(14) 3382-1327',
      whatsapp: '(14) 99844-3897',
      email: 'ceinsffartura@yahoo.com.br',
      horario: {
        segunda_sexta: '06:30 às 17:30hs',
        sabado: 'Fechado',
        domingo: 'Fechado'
      },
      links_institucionais: [
        { titulo: 'A Entidade', url: '/historia' },
        { titulo: 'Diretorias', url: '/estrutura' },
        { titulo: 'Galeria de Fotos', url: '/#galeria' },
        { titulo: 'Estatuto Social', url: '/transparencia' },
        { titulo: 'Editais', url: '/transparencia' },
        { titulo: 'Portal da Transparência', url: '/transparencia' }
      ],
      redes_sociais: {
        instagram: true,
        facebook: true,
        youtube: true
      },
      registros: {
        cme: '03',
        cmdca: '06',
        inep: '38438558'
      }
    })
  ]
);
console.log('✅ Seção FOOTER atualizada');

// Atualizar seção HISTÓRIA com dados reais
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'historia'`,
  [
    'Nossa História',
    'O Centro de Educação Infantil "Nossa Senhora de Fátima" é um estabelecimento de ensino que possui inscrição no CME nº 03 e no CMDCA nº 06, com o código de INEP: 38438558, funciona em sede própria. Localizado na Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura/SP, o CEI é uma pessoa jurídica de direito privado, com objetivos, estrutura organizacional e competências definidas em estatuto. Ao longo de 47 anos de experiência, a instituição tem se dedicado a oferecer educação infantil de qualidade para a comunidade de Fartura e região.',
    'Mais de 47 Anos de Dedicação à Educação Infantil',
    'O CEI Nossa Senhora de Fátima tem objetivos, estrutura organizacional e competências definidas em estatuto. Atendendo às Políticas de Governança e de Transparência.',
    JSON.stringify({
      anos_experiencia: 47,
      fundacao: 'Década de 1970',
      sede: 'Própria',
      endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
      registros: {
        cme: '03',
        cmdca: '06',
        inep: '38438558'
      },
      natureza_juridica: 'Pessoa jurídica de direito privado'
    })
  ]
);
console.log('✅ Seção HISTÓRIA atualizada');

// Atualizar seção ESTRUTURA FÍSICA
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'estrutura_fisica'`,
  [
    'Estrutura Física',
    'O CEI Nossa Senhora de Fátima funciona em sede própria, localizada na Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura/SP. A instituição conta com infraestrutura adequada para o atendimento de crianças da primeira infância, incluindo salas de aula, áreas de recreação, refeitório, berçário e espaços ao ar livre para atividades pedagógicas e lúdicas.',
    'Nossa Infraestrutura',
    'Espaços planejados para o desenvolvimento integral das crianças',
    JSON.stringify({
      sede: 'Própria',
      endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
      ambientes: ['Salas de aula', 'Berçário', 'Refeitório', 'Área de recreação', 'Espaços ao ar livre', 'Cozinha', 'Lavanderia', 'Administração']
    })
  ]
);
console.log('✅ Seção ESTRUTURA FÍSICA atualizada');

// Atualizar seção EQUIPE PEDAGÓGICA
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    metadata = ?
  WHERE sectionKey = 'equipe_pedagogica'`,
  [
    'Equipe Pedagógica',
    'Nossa instituição conta com 19 educadores dedicados ao desenvolvimento integral das crianças. A equipe é composta por profissionais qualificados que atuam com amor e dedicação, promovendo um ambiente acolhedor e seguro para todas as crianças atendidas.',
    'Nossos Profissionais',
    'Equipe qualificada e dedicada ao cuidado e educação infantil',
    JSON.stringify({
      total_educadores: 19,
      formacao: 'Profissionais qualificados em educação infantil',
      abordagem: 'Pedagogia do afeto e desenvolvimento integral'
    })
  ]
);
console.log('✅ Seção EQUIPE PEDAGÓGICA atualizada');

// Atualizar seção GALERIA
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?
  WHERE sectionKey = 'galeria'`,
  [
    'Explore Nossa Incrível Galeria de Fotos',
    'Conheça os ambientes, as atividades e o dia a dia da nossa instituição através de fotos reais.',
    'NOSSAS FOTOS',
    'Registros do cotidiano escolar e atividades pedagógicas da CEI Nossa Senhora de Fátima'
  ]
);
console.log('✅ Seção GALERIA atualizada');

// Atualizar seção CTA FINAL
await connection.execute(
  `UPDATE content_sections SET 
    sectionName = ?,
    content = ?,
    subtitle = ?,
    description = ?,
    cta = ?,
    ctaLink = ?,
    metadata = ?
  WHERE sectionKey = 'cta_final'`,
  [
    'Entre em Contato',
    'Estamos prontos para ajudá-lo com informações sobre a entidade. Se você tem alguma dúvida, sugestão ou reclamação, fale com a gente. Estamos prontos para te ouvir.',
    'Fale Conosco',
    'Entre em contato para conhecer melhor o CEI Nossa Senhora de Fátima ou agende uma visita.',
    'Enviar Mensagem',
    '/contato',
    JSON.stringify({
      formulario: {
        campos: ['Nome', 'Telefone', 'E-mail', 'Assunto', 'Mensagem'],
        botao: 'Enviar Mensagem'
      },
      contatos: {
        endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
        telefone: '(14) 3382-1327',
        whatsapp: '(14) 99844-3897',
        email: 'ceinsffartura@yahoo.com.br'
      }
    })
  ]
);
console.log('✅ Seção CTA FINAL atualizada');

// Inserir seção de EDITAIS se não existir
const [existingEditais] = await connection.execute(
  `SELECT id FROM content_sections WHERE sectionKey = 'editais'`
);

if (existingEditais.length === 0) {
  await connection.execute(
    `INSERT INTO content_sections (sectionKey, sectionName, content, subtitle, description, metadata, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      'editais',
      'Editais - CEI Nossa Senhora de Fátima',
      'O CEI Nossa Senhora de Fátima, pessoa jurídica de direito privado, tem objetivos, estrutura organizacional e competências definidas em estatuto. Atendendo às Políticas de Governança e de Transparência da CEI Nossa Senhora de Fátima, nesta página disponibilizamos nossos Editais.',
      'Editais e Processos Seletivos',
      'Documentos públicos de transparência e processos seletivos da instituição',
      JSON.stringify({
        editais: [
          { ano_mes: '2022/04', titulo: 'Edital 001 2022 Contratação Estagiária', mes_referencia: 'Abril', categoria: 'Edital' },
          { ano_mes: '2021/02', titulo: 'Edital de Convocação 2022', mes_referencia: 'Fevereiro', categoria: 'Edital' }
        ]
      }),
      1
    ]
  );
  console.log('✅ Seção EDITAIS criada');
} else {
  console.log('ℹ️ Seção EDITAIS já existe');
}

// Inserir seção de CONTATOS se não existir
const [existingContatos] = await connection.execute(
  `SELECT id FROM content_sections WHERE sectionKey = 'contatos'`
);

if (existingContatos.length === 0) {
  await connection.execute(
    `INSERT INTO content_sections (sectionKey, sectionName, content, subtitle, description, metadata, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      'contatos',
      'Contatos',
      'Estamos prontos para ajudá-lo com informações sobre a entidade. Se você tem alguma dúvida, sugestão ou reclamação, fale com a gente. Estamos prontos para te ouvir.',
      'Entrar em Contato',
      'Informações de contato e formulário para comunicação direta com a instituição',
      JSON.stringify({
        endereco: 'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP',
        telefone: '(14) 3382-1327',
        whatsapp: '(14) 99844-3897',
        email: 'ceinsffartura@yahoo.com.br',
        horario: {
          segunda_sexta: '06:30 às 17:30hs',
          sabado: 'Fechado',
          domingo: 'Fechado'
        },
        formulario: {
          campos: ['Nome', 'Telefone', 'E-mail', 'Assunto', 'Mensagem'],
          botao: 'Enviar Mensagem'
        }
      }),
      1
    ]
  );
  console.log('✅ Seção CONTATOS criada');
} else {
  console.log('ℹ️ Seção CONTATOS já existe');
}

await connection.end();
console.log('\n🎉 Banco de dados atualizado com dados reais do site www.ceinsf.com.br!');
