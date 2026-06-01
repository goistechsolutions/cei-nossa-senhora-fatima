import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

async function seed() {
  let connection;
  try {
    // Parse DATABASE_URL
    const url = new URL(DATABASE_URL);
    const config = {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: {},
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    connection = await mysql.createConnection(config);

    console.log('✅ Conectado ao banco de dados');

    // Atualizar seção de Contatos com dados reais
    await connection.execute(
      `UPDATE content_sections 
       SET sectionName = ?, content = ?, subtitle = ?, description = ?, cta = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [
        'Entre em Contato',
        'Rua Santa Bernadete, 171 - Vila Nossa Senhora de Fátima - Fartura - SP\n\nTelefone: (14) 3382-1327\nWhatsApp: (14) 99844-3897\nEmail: ceinsffartura@yahoo.com.br\n\nHorário de Funcionamento:\nSegunda a Sexta: 06:30 às 17:30\nSábado: Fechado\nDomingo: Fechado',
        'Estamos aqui para responder suas dúvidas',
        'Fale conosco através dos canais de contato disponíveis. Nossa equipe está pronta para ajudar.',
        'Enviar Mensagem',
        'contato'
      ]
    );

    // Atualizar seção de Atendimento com dados reais
    await connection.execute(
      `UPDATE content_sections 
       SET sectionName = ?, content = ?, subtitle = ?, description = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [
        'Nosso Atendimento',
        'Atendemos 125+ alunos com 19+ educadores dedicados, oferecendo 200+ dias letivos de educação de qualidade. Com 47+ anos de experiência, somos referência em educação infantil em Fartura-SP.',
        'Qualidade e Dedicação',
        'Números que refletem nosso compromisso com a excelência educacional',
        'atendimento'
      ]
    );

    // Atualizar seção de Footer com dados reais
    await connection.execute(
      `UPDATE content_sections 
       SET sectionName = ?, content = ?, subtitle = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [
        'CEI Nossa Senhora de Fátima',
        'Inscrição CME nº 03 | CMDCA nº 06 | INEP: 38438558\nRua Santa Bernadete, 171 - Fartura - SP\n(14) 3382-1327 | (14) 99844-3897\nceinsffartura@yahoo.com.br',
        'Educação Infantil Gratuita com Excelência',
        'footer'
      ]
    );

    // Atualizar seção Hero com dados reais
    await connection.execute(
      `UPDATE content_sections 
       SET sectionName = ?, content = ?, subtitle = ?, cta = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [
        'Projeto "Criança"',
        'Na nossa creche proporcionamos um ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante. Aqui, cada criança é cercada por amor e cuidado, enquanto desfruta de momentos de lazer que enriquecem sua infância. No Projeto "Criança", nosso compromisso é garantir que todas as crianças cresçam felizes, saudáveis e confiantes.',
        'SEGURANÇA, APRENDIZADO, LAZER TUDO COM MUITO AMOR',
        'Conheça Nossa História',
        'hero'
      ]
    );

    console.log('✅ Dados reais atualizados com sucesso!');

    // Verificar dados atualizados
    const [rows] = await connection.execute(
      'SELECT sectionKey, sectionName, updatedAt FROM content_sections ORDER BY sectionKey'
    );
    console.log('\n📋 Seções atualizadas:');
    rows.forEach(row => {
      console.log(`  - ${row.sectionKey}: ${row.sectionName}`);
    });

  } catch (error) {
    console.error('❌ Erro ao atualizar dados:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seed();
