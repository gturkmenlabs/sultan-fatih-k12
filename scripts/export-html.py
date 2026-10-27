"""Export the running preview into one self-contained, navigable HTML file.
Requires beautifulsoup4; run after npm run build and starting port 3000.
"""
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlparse, parse_qs, unquote
from bs4 import BeautifulSoup
import base64, mimetypes, json, re

base = 'http://localhost:3000'
routes = ['/', '/kurumsal', '/kademeler', '/kampusler', '/kayit-burslar', '/iletisim', '/on-kayit'] + ['/kurumsal/'+s for s in ['genel-mudurun-mesaji','vizyon-misyon','e-safety','okul-marsimiz','destek-hizmetleri']]
assets = {}
styles = {}
sections = []
body_classes = ''

def asset(url):
    if url.startswith('/_next/image'):
        url = parse_qs(urlparse(url).query)['url'][0]
    if url not in assets:
        local = Path('public'+unquote(url)) if url.startswith('/sites/') else None
        data = local.read_bytes() if local and local.exists() else urlopen(base+url).read()
        mime = mimetypes.guess_type(urlparse(url).path)[0] or 'application/octet-stream'
        assets[url] = 'data:'+mime+';base64,'+base64.b64encode(data).decode()
    return url

for route in routes:
    soup = BeautifulSoup(urlopen(base+route).read(), 'html.parser')
    for link in soup.select('link[rel="stylesheet"]'):
        url=link['href']
        if url not in styles:
            css=urlopen(base+url).read().decode()
            def font(m):
                u=m.group(1).strip('\'"')
                if u.startswith('../media/'): u='/_next/static/media/'+u.split('/')[-1]
                if u.startswith('/'):
                    return 'url("'+assets[asset(u)]+'")'
                return m.group(0)
            styles[url]=re.sub(r'url\(([^)]+)\)',font,css)
    body=soup.body
    if not body_classes: body_classes = " ".join(body.get("class", []))
    for el in body.select('script, link, next-route-announcer'):
        el.decompose()
    for img in body.select('img'):
        src=img.get('src','')
        if src.startswith('/'):
            img['data-asset']=asset(src)
            img['src']='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        for attr in ['srcset','sizes','loading','fetchpriority']: img.attrs.pop(attr,None)
    for el in body.select('[aria-hidden="true"]'):
        # Decorative icons remain, but Next's off-screen routing artifacts do not matter.
        pass
    for form in body.select('form'):
        notice=soup.new_tag('div',attrs={'class':'static-notice'})
        notice.string='Bu dosya statik tanıtım kopyasıdır. Başvuru göndermek için okul ile iletişime geçin: 0212 531 22 82 · bilgi@sultanfatih.k12.tr'
        form.replace_with(notice)
    for btn in body.select('button'):
        if 'Menüyü aç' in btn.get('aria-label',''): btn['data-menu']='true'
    # A compact always-available navigation replaces hydration-dependent menus.
    for header in body.select('header'): header.decompose()
    for nav in body.select('nav[aria-label="Hızlı işlemler"]'): nav.decompose()
    section=soup.new_tag('section',attrs={'data-page':route,'class':'export-page'})
    section['data-title']=soup.title.get_text() if soup.title else 'Sultan Fatih'
    section.append(BeautifulSoup(body.decode_contents(),'html.parser'))
    sections.append(str(section))

nav=''.join(f'<a href="{r}" data-route="{r}">{label}</a>' for r,label in [('/','Ana Sayfa'),('/kurumsal','Kurumumuzu Tanıyın'),('/kademeler','Kademeler'),('/kampusler','Kampüsler'),('/kayit-burslar','Kayıt & Burslar'),('/iletisim','İletişim')])
extra='''
.export-page{display:none}.export-page.active{display:block}
.export-nav{position:sticky;top:0;z-index:100;background:#fbbf24;padding:14px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;box-shadow:0 2px 8px #0f172a15}
.export-nav a{padding:10px 14px;border-radius:8px;font-size:15px;font-weight:600}.export-nav a[aria-current]{background:white}
.static-notice{padding:24px;border-radius:16px;background:#f8fafc;border:1px solid #cbd5e1;color:#334155}
.export-page .sfk-reveal{opacity:1;transform:none} dialog{padding:12px;border:0;border-radius:16px;max-width:95vw;max-height:95vh}dialog::backdrop{background:#0f172add}dialog img{max-height:85vh;max-width:90vw;object-fit:contain}
'''
js=r'''
const assets=ASSETS;
document.querySelectorAll('img[data-asset]').forEach(img=>{img.src=assets[img.dataset.asset]});
function show(route,anchor=''){
 const page=[...document.querySelectorAll('[data-page]')].find(p=>p.dataset.page===route)||document.querySelector('[data-page="/"]');
 document.querySelectorAll('[data-page]').forEach(p=>p.classList.toggle('active',p===page));
 document.title=page.dataset.title;
 document.querySelectorAll('.export-nav a').forEach(a=>{a.removeAttribute('aria-current');if(a.dataset.route===route)a.setAttribute('aria-current','page')});
 window.scrollTo(0,0);
 if(anchor)requestAnimationFrame(()=>page.querySelector('[id="'+CSS.escape(anchor)+'"]')?.scrollIntoView());
}
function readHash(){const text=location.hash.slice(1)||'/';const [route,anchor]=text.split('::');show(route,anchor)}
window.addEventListener('hashchange',readHash);
document.addEventListener('click',event=>{
 const a=event.target.closest('a');
 if(a){const href=a.getAttribute('href')||'';
  if(href.startsWith('/')||href.startsWith('#')){event.preventDefault();let route=document.querySelector('.export-page.active').dataset.page,anchor='';if(href.startsWith('/')){const parts=href.split('#');route=parts[0].split('?')[0];anchor=parts[1]||''}else anchor=href.slice(1);const next=route+(anchor?'::'+anchor:'');if(location.hash.slice(1)===next)show(route,anchor);else location.hash=next;}
 }
 const btn=event.target.closest('button');
 if(btn){
 const label=btn.getAttribute('aria-label')||'';
 if(label.includes('kampüs tercihini kaldır')||label.includes('benim kampüsüm olarak seç')){alert('Kampüs tercihi ve form taslakları canlı sitede kullanılabilir. Bu dosya statik tanıtım kopyasıdır.');return}
 if(label.includes('Önceki başarı')||label.includes('Sonraki başarı')||label.match(/^\d+\. başarı/)){
  const section=btn.closest('section');const slides=[...section.querySelectorAll('a:has(img)')];let idx=slides.findIndex(s=>!s.classList.contains('hidden'));const chosen=parseInt(label);idx=Number.isNaN(chosen)?(idx+(label.includes('Önceki')?-1:1)+slides.length)%slides.length:chosen-1;slides.forEach((s,i)=>{s.classList.toggle('hidden',i!==idx);s.classList.toggle('block',i===idx)});
 }
 }
});
readHash();
'''
# Explicitly label the static copy: React state/API features are not silently simulated.
html='<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sultan Fatih Eğitim Kurumları</title><style>'+''.join(styles.values())+extra+'</style></head><body class="'+body_classes+'"><nav class="export-nav" aria-label="Ana menü">'+nav+'</nav><aside class="static-notice" style="border-radius:0;text-align:center;padding:10px;font-size:13px">Statik HTML tanıtım kopyası · Form gönderimi, filtreler, galeri penceresi ve kişisel tercihler için canlı siteyi kullanın.</aside>'+''.join(sections)+'<script>'+js.replace('ASSETS',json.dumps(assets,ensure_ascii=False))+'</script></body></html>'
out=Path('exports/sultan-fatih.html');out.write_text(html)
print(f'{out}: {out.stat().st_size/1024/1024:.1f} MB; {len(routes)} sayfa; {len(assets)} gömülü dosya')
