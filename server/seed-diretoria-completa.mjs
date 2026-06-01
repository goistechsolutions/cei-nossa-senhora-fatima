import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

async function seedDiretoriaCompleta() {
  let connection;
  try {
    // Parse DATABASE_URL
    const url = new URL(DATABASE_URL);
    const config = {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      port: url.port || 3306,
      ssl: {},
    };

    connection = await mysql.createConnection(config);
    console.log('✅ Conectado ao banco de dados');

    // Atualizar seção de Diretoria
    const diretoriaContent = `
<div class="diretoria-container">
  <div class="diretoria-header">
    <h2>Conheça nossa Diretoria</h2>
    <p>Dirigindo com carinho nossa Entidade</p>
  </div>

  <div class="diretoria-grid">
    <div class="diretoria-card">
      <h3>José Antônio Correa Custtódio</h3>
      <p class="cargo">Presidente</p>
    </div>

    <div class="diretoria-card">
      <h3>Simone Maria Alcântara</h3>
      <p class="cargo">Vice - Presidente</p>
    </div>

    <div class="diretoria-card">
      <h3>Daniel Romero Silva</h3>
      <p class="cargo">Tesoureiro(a)</p>
    </div>

    <div class="diretoria-card">
      <h3>Flávio Ferreira da Silva</h3>
      <p class="cargo">Secretário(a)</p>
    </div>

    <div class="diretoria-card">
      <h3>Juliano Damásio de Castro</h3>
      <p class="cargo">2º Secretário(a)</p>
    </div>

    <div class="diretoria-card">
      <h3>Valter Adrino Miranda</h3>
      <p class="cargo">1º Conselheiro(a) Fiscal</p>
    </div>

    <div class="diretoria-card">
      <h3>Maria Tereza Correa</h3>
      <p class="cargo">Suplente 1º Conselheiro(a) Fiscal</p>
    </div>

    <div class="diretoria-card">
      <h3>Valtélia Maria Nóbile</h3>
      <p class="cargo">2º Conselheiro(a) Fiscal</p>
    </div>

    <div class="diretoria-card">
      <h3>Luiz Carlo Rocha</h3>
      <p class="cargo">Suplente 2º Conselheiro(a) Fiscal</p>
    </div>

    <div class="diretoria-card">
      <h3>Clarinda Carlos Pacheco</h3>
      <p class="cargo">3º Conselheiro(a) Fiscal</p>
    </div>

    <div class="diretoria-card">
      <h3>Vito André Cola</h3>
      <p class="cargo">Suplente 3º Conselheiro(a) Fiscal</p>
    </div>
  </div>
</div>
    `.trim();

    // Atualizar seção de Objetivos
    const objetivosContent = `Possibilitar experiências de ensino e de aprendizagem que promovam o desenvolvimento integral das crianças, o cognitivo, o físico e o socioemocional, funções especificamente humanas, estabelecendo...`;

    // Atualizar seção de Missão (expandida)
    const missaoContent = `Educação e socialização, ao cuidar e ao educar simultaneamente, priorizando todos os aspectos, desde o físico, o psicológico, o intelectual e social, e ainda complementando-se com a ação familiar e comunidade...`;

    // Atualizar seção de Visão (expandida)
    const visaoContent = `Compreender a infância e reconhecer a criança, numa perspectiva de educação para a cidadania que reflita na qualidade de formação do ser humano que interage ativamente com o meio em que vive.`;

    // Atualizar seção de Valores (expandida)
    const valoresContent = `Respeito, Paciência, Persistência, Prudência, Civilidade, Responsabilidade, Ordem, Sinceridade, Confiança, Diálogo, Tolerância, Criatividade, Cooperação, Compaixão, Generosidade, Amizade, Liberdade.`;

    // Atualizar Diretoria
    await connection.execute(
      `UPDATE content_sections 
       SET sectionName = ?, subtitle = ?, content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      ['Conheça nossa Diretoria', 'Dirigindo com carinho nossa Entidade', diretoriaContent, 'diretoria']
    );
    console.log('✅ Diretoria atualizada');

    // Atualizar Objetivos
    await connection.execute(
      `UPDATE content_sections 
       SET content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [objetivosContent, 'objetivos']
    );
    console.log('✅ Objetivos atualizados');

    // Atualizar Missão
    await connection.execute(
      `UPDATE content_sections 
       SET content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [missaoContent, 'missao']
    );
    console.log('✅ Missão atualizada');

    // Atualizar Visão
    await connection.execute(
      `UPDATE content_sections 
       SET content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [visaoContent, 'visao']
    );
    console.log('✅ Visão atualizada');

    // Atualizar Valores
    await connection.execute(
      `UPDATE content_sections 
       SET content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [valoresContent, 'valores']
    );
    console.log('✅ Valores atualizados');

    // Atualizar Atendimento com estatísticas
    const atendimentoContent = `
<div class="atendimento-stats">
  <div class="stat-card">
    <div class="stat-number">125+</div>
    <div class="stat-label">Alunos Matriculados</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">200+</div>
    <div class="stat-label">Dias Letivos</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">19+</div>
    <div class="stat-label">Educadores</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">47+</div>
    <div class="stat-label">Anos de Experiência</div>
  </div>
</div>
    `.trim();

    await connection.execute(
      `UPDATE content_sections 
       SET content = ?, updatedAt = NOW()
       WHERE sectionKey = ?`,
      [atendimentoContent, 'atendimento']
    );
    console.log('✅ Atendimento atualizado');

    console.log('\n✅ Todas as informações foram atualizadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao atualizar banco de dados:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDiretoriaCompleta();
