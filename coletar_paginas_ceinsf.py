import requests
from bs4 import BeautifulSoup
from pathlib import Path

pages = {
    'home': 'https://www.ceinsf.com.br/ceinsf/',
    'entidade': 'https://www.ceinsf.com.br/ceinsf/entidade',
    'diretoria': 'https://www.ceinsf.com.br/ceinsf/diretoria',
    'galeria_de_fotos': 'https://www.ceinsf.com.br/ceinsf/galeriaDeFotos',
    'estatuto_social': 'https://www.ceinsf.com.br/ceinsf/estatutoSocial',
    'regimento_interno': 'https://www.ceinsf.com.br/ceinsf/regimentoInterno',
    'regulamento_contratacao': 'https://www.ceinsf.com.br/ceinsf/regulamentoContratacao',
    'regulamento_compras': 'https://www.ceinsf.com.br/ceinsf/regulamentoCompras',
    'editais': 'https://www.ceinsf.com.br/ceinsf/editais',
    'portal_transparencia': 'https://www.ceinsf.com.br/ceinsf/portalTransparencia',
    'trabalhe_conosco': 'https://www.ceinsf.com.br/ceinsf/enviarCurriculo',
    'contatos': 'https://www.ceinsf.com.br/ceinsf/contatos',
}

out = Path('/home/ubuntu/demo-cei-nossa-senhora-fatima/conteudo_paginas_site_atual.md')
headers = {'User-Agent': 'Mozilla/5.0 Manus content extraction for site redesign'}
lines = ['# Conteúdo textual coletado do site atual do CEI', '']

for name, url in pages.items():
    try:
        r = requests.get(url, headers=headers, timeout=20)
        status = r.status_code
        soup = BeautifulSoup(r.text, 'html.parser')
        for tag in soup(['script', 'style', 'noscript']):
            tag.decompose()
        title = soup.title.get_text(' ', strip=True) if soup.title else name
        text_lines = []
        for el in soup.find_all(['h1', 'h2', 'h3', 'h4', 'p', 'li', 'td', 'th', 'span', 'a']):
            text = ' '.join(el.get_text(' ', strip=True).split())
            if len(text) >= 2:
                text_lines.append(text)
        dedup = []
        seen = set()
        for text in text_lines:
            if text not in seen:
                seen.add(text)
                dedup.append(text)
        lines.append(f'## {name.replace("_", " ").title()}')
        lines.append('')
        lines.append(f'URL: {url}')
        lines.append(f'Status HTTP: {status}')
        lines.append(f'Título: {title}')
        lines.append('')
        for text in dedup[:120]:
            lines.append(f'- {text}')
        lines.append('')
    except Exception as exc:
        lines.append(f'## {name}')
        lines.append(f'Erro ao coletar {url}: {exc}')
        lines.append('')

out.write_text('\n'.join(lines), encoding='utf-8')
print(out)
