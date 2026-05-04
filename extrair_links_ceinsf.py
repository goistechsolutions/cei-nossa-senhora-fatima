from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin

html_path = Path('/home/ubuntu/upload/www.ceinsf.com.br_ceinsf_estatutoSocial_1777882163176.html')
out_path = Path('/home/ubuntu/demo-cei-nossa-senhora-fatima/links_site_atual_ceinsf.md')
base = 'https://www.ceinsf.com.br/ceinsf/estatutoSocial'

soup = BeautifulSoup(html_path.read_text(encoding='utf-8', errors='ignore'), 'html.parser')
links = []
seen = set()
for a in soup.find_all('a'):
    text = ' '.join(a.get_text(' ', strip=True).split())
    href = a.get('href') or ''
    if not href and not text:
        continue
    full = urljoin(base, href) if href else ''
    key = (text, full)
    if key in seen:
        continue
    seen.add(key)
    links.append((text or '(sem texto)', full))

lines = ['# Links extraídos do HTML do site atual', '']
lines.append('| Texto | URL |')
lines.append('|---|---|')
for text, full in links:
    safe_text = text.replace('|', '\\|')
    safe_full = full.replace('|', '\\|')
    lines.append(f'| {safe_text} | {safe_full} |')

out_path.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'Links extraídos: {len(links)}')
print(out_path)
