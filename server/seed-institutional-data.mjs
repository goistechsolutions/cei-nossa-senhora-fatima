import mysql from 'mysql2/promise';
import { URL } from 'url';

// Parse DATABASE_URL corretamente
const dbUrl = new URL(process.env.DATABASE_URL || 'mysql://root@localhost/test');
const host = dbUrl.hostname;
const user = dbUrl.username;
const password = dbUrl.password;
const database = dbUrl.pathname.substring(1); // Remove leading /

const connection = await mysql.createConnection({
  host,
  user,
  password,
  database,
  ssl: {},
});

const institutionalData = {
  contentSections: [
    {
      sectionKey: 'historia',
      sectionName: 'Nossa História',
      content: 'O Centro de Educação Infantil "Nossa Senhora de Fátima" é um estabelecimento de ensino que possui inscrição no CME nº 03 e no CMDCA nº 06, com o código de INEP: 38438558, funciona em sede própria. Com 47 anos de experiência, nossa instituição filantrópica tem dedicado-se à educação infantil de qualidade, oferecendo um ambiente acolhedor e seguro para o desenvolvimento integral das crianças.',
      subtitle: '47 Anos de Legado e Dedicação',
      metadata: JSON.stringify({ priority: 1, published: true, type: 'institutional' }),
    },
    {
      sectionKey: 'missao_visao_valores',
      sectionName: 'Missão, Visão e Valores',
      content: 'Nossa Missão é promover educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos, desde o físico, o psicológico, o intelectual e social, complementando-se com a ação familiar e comunitária. Nossa Visão é compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania que reflita na qualidade de formação do ser humano que interage ativamente com o meio em que vive. Nossos Valores incluem: Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança, Diálogo, Tolerância, Criatividade, Cooperação, Compaixão, Generosidade, Amizade e Liberdade.',
      subtitle: 'Princípios que Guiam Nossa Instituição',
      metadata: JSON.stringify({ priority: 2, published: true, type: 'institutional' }),
    },
    {
      sectionKey: 'estrutura_fisica',
      sectionName: 'Estrutura Física',
      content: 'Localizada em sede própria na Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP, nossa instituição conta com ambientes especialmente preparados para o desenvolvimento integral das crianças. Possuímos salas de aula acolhedoras, áreas de recreação seguras, horta educativa, refeitório, e espaços para atividades pedagógicas diversificadas. Todos os ambientes são projetados com foco em segurança, conforto e estímulo ao aprendizado.',
      subtitle: 'Ambientes Preparados para Aprender e Crescer',
      metadata: JSON.stringify({ priority: 3, published: true, type: 'institutional' }),
    },
    {
      sectionKey: 'projeto_crianca',
      sectionName: 'Projeto "Criança"',
      content: 'Na nossa creche proporcionamos um ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante. Aqui, cada criança é cercada por amor e cuidado, enquanto desfruta de momentos de lazer que enriquecem sua infância. No Projeto "Criança", nosso compromisso é garantir que todas as crianças cresçam felizes, saudáveis e confiantes. Objetivamos possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças, o cognitivo, o físico e o socioemocional, funções especificamente humanas.',
      subtitle: 'Segurança, Aprendizado, Lazer Tudo com Muito Amor',
      metadata: JSON.stringify({ priority: 4, published: true, type: 'institutional' }),
    },
    {
      sectionKey: 'equipe_pedagogica',
      sectionName: 'Equipe Pedagógica',
      content: 'Nossa instituição conta com 19 educadores altamente qualificados e dedicados ao desenvolvimento integral das crianças. A equipe é composta por professores, auxiliares de educação, nutricionista, e profissionais de apoio, todos comprometidos com a excelência educacional e o bem-estar das crianças. Realizamos capacitações contínuas para manter nossa equipe atualizada com as melhores práticas em educação infantil.',
      subtitle: '19 Educadores Dedicados ao Desenvolvimento Infantil',
      metadata: JSON.stringify({ priority: 5, published: true, type: 'institutional' }),
    },
    {
      sectionKey: 'atendimento',
      sectionName: 'Atendimento',
      content: 'Atendemos crianças do Berçário ao Maternal, oferecendo educação infantil gratuita com excelência. Funcionamos de segunda a sexta, das 06:30 às 17:30, proporcionando um atendimento integral que inclui alimentação saudável, atividades pedagógicas, recreação e cuidados com a saúde e higiene. Contamos com 125+ alunos matriculados e 200+ dias letivos anuais.',
      subtitle: 'Educação Infantil de Qualidade para Todos',
      metadata: JSON.stringify({ priority: 6, published: true, type: 'institutional' }),
    },
  ],
};

try {
  console.log('🌱 Iniciando seed de dados institucionais...');

  // Insert or update content sections
  for (const section of institutionalData.contentSections) {
    await connection.execute(
      `INSERT INTO content_sections (sectionKey, sectionName, subtitle, content, metadata, updatedBy, updatedAt, createdAt)
       VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())
       ON DUPLICATE KEY UPDATE
       sectionName = VALUES(sectionName),
       subtitle = VALUES(subtitle),
       content = VALUES(content),
       metadata = VALUES(metadata),
       updatedAt = NOW()`,
      [
        section.sectionKey,
        section.sectionName,
        section.subtitle || null,
        section.content || null,
        section.metadata || null,
      ]
    );
    console.log(`✅ Seção "${section.sectionName}" inserida/atualizada`);
  }

  console.log('✨ Seed de dados institucionais concluído com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('❌ Erro ao fazer seed de dados institucionais:', error);
  process.exit(1);
} finally {
  await connection.end();
}
