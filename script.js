// script.js - interactions (language, menu, product injection)
const LANG = {
  es: {
    hero_title: "Elaboración tradicional del pan",
    hero_lead: "Venga a conocer nuestro proceso artesanal: desde la masa hasta el horno.",
    ver_productos: "Ver productos",
    contacto_btn: "Contacto",
    anim_caption: "Animación: masa → formado → horneado",
    panaderia: "Panadería",
    pan_desc: "Hasta 10 productos (próximamente 12).",
    bolleria: "Pastelería - Bollería",
    boll_desc: "Dulces y bollos recién horneados cada mañana.",
    empanadas: "Empanadas",
    emp_desc: "Rellenos tradicionales y modernos.",
    contacto: "Contacto",
    direccion_label: "Dirección:",
    telefono_label: "Teléfono:",
    horario_label: "Horario:",
    footer_lang: "ES / PT",
    m_pan: "Pan",
    m_boll: "Bollos",
    m_emp: "Emp."
  },
  pt: {
    hero_title: "Produção tradicional do pão",
    hero_lead: "Venha conhecer o nosso processo artesanal: da massa ao forno.",
    ver_productos: "Ver produtos",
    contacto_btn: "Contacto",
    anim_caption: "Animação: massa → modelagem → cozedura",
    panaderia: "Padaria",
    pan_desc: "Até 10 produtos (em breve 12).",
    bolleria: "Pastelaria - Bolos",
    boll_desc: "Doces e bolos acabados de sair do forno todas as manhãs.",
    empanadas: "Empadas",
    emp_desc: "Recheios tradicionais e modernos.",
    contacto: "Contacto",
    direccion_label: "Morada:",
    telefono_label: "Telefone:",
    horario_label: "Horário:",
    footer_lang: "ES / PT",
    m_pan: "Pão",
    m_boll: "Bolos",
    m_emp: "Emp."
  }
};

let currentLang = 'es';

function tApply(lang){
  document.querySelectorAll('[data-key]').forEach(el=>{
    const k = el.getAttribute('data-key');
    if(k && LANG[lang][k]) el.textContent = LANG[lang][k];
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  // initial translations
  tApply(currentLang);

  // setup menu overlay
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('mobileOverlay');
  const closeOverlay = document.getElementById('closeOverlay');
  menuBtn.addEventListener('click', ()=>{ overlay.hidden = false; overlay.removeAttribute('aria-hidden'); });
  closeOverlay.addEventListener('click', ()=>{ overlay.hidden = true; overlay.setAttribute('aria-hidden', 'true'); });

  // mobile lang
  const mobileLang = document.getElementById('mobileLang');
  const langToggle = document.getElementById('langToggle');
  mobileLang.addEventListener('click', toggleLang);
  langToggle.addEventListener('click', toggleLang);

  // inject sample products
  const panProducts = [
    {name_es:"Baguette clásica", name_pt:"Baguete clássica", desc:"Harina, agua, levadura, sal"},
    {name_es:"Molde integral", name_pt:"Pão integral", desc:"Harina integral y semillas"},
    {name_es:"Centeno", name_pt:"Centeio", desc:"Harina de centeno y masa madre"},
    {name_es:"Pan de pueblo", name_pt:"Pão rústico", desc:"Corteza crujiente, miga tierna"},
    {name_es:"Pan de aceitunas", name_pt:"Pão de azeitonas", desc:"Aceitunas negras troceadas"},
    {name_es:"Pan de masa madre", name_pt:"Pão de fermento natural", desc:"Fermentación larga"},
    {name_es:"Pan con nueces", name_pt:"Pão com nozes", desc:"Nueces troceadas en la masa"},
    {name_es:"Pan de ajo", name_pt:"Pão de alho", desc:"Toque de ajo y hierbas"},
    {name_es:"Pan con semillas", name_pt:"Pão com sementes", desc:"Mezcla de semillas"},
    {name_es:"Paneco", name_pt:"Paneco", desc:"Pequeño pan de ración"}
  ];
  const bolleria = [
    {name_es:"Croissant", name_pt:"Croissant", desc:"Mantequilla laminada"},
    {name_es:"Ensaimada", name_pt:"Ensaimada", desc:"Suave y esponjosa"},
    {name_es:"Magdalena", name_pt:"Madeleine", desc:"Dulce tradicional"},
    {name_es:"Napolitana", name_pt:"Napolitana", desc:"Relleno de crema"},
    {name_es:"Palmera", name_pt:"Palmera", desc:"Hojaldre con azúcar"},
    {name_es:"Bizcocho", name_pt:"Bolo", desc:"Casero y jugoso"},
    {name_es:"Sobaos", name_pt:"Sobaos", desc:"Mantequilla y huevo"},
    {name_es:"Tarta de manzana", name_pt:"Tarte de maçã", desc:"Manzanas y canela"}
  ];
  const empanadas = [
    {name_es:"Empanada de bonito", name_pt:"Empada de atum", desc:"Atún, pimiento, cebolla"},
    {name_es:"Empanada de carne", name_pt:"Empada de carne", desc:"Carne guisada con especias"},
    {name_es:"Empanada vegetal", name_pt:"Empada vegetal", desc:"Verduras y queso"},
    {name_es:"Empanada de pollo", name_pt:"Empada de frango", desc:"Pollo con salsa"}
  ];

  function createCard(p, type){
    const card = document.createElement('article');
    card.className = 'card';
    const img = document.createElement('img');
    // placeholder data URI image with text
    const txt = encodeURIComponent((currentLang==='es'?p.name_es:p.name_pt));
    img.src = `https://via.placeholder.com/600x400.png?text=${txt}`;
    img.alt = (currentLang==='es'?p.name_es:p.name_pt);
    const h4 = document.createElement('h4');
    h4.textContent = (currentLang==='es'?p.name_es:p.name_pt);
    const pdesc = document.createElement('p');
    pdesc.textContent = p.desc;
    card.append(img,h4,pdesc);
    return card;
  }

  const panGrid = document.getElementById('panGrid');
  const bollGrid = document.getElementById('bollGrid');
  const empGrid = document.getElementById('empGrid');

  function renderAll(){
    panGrid.innerHTML='';bollGrid.innerHTML='';empGrid.innerHTML='';
    panProducts.forEach(p=>panGrid.appendChild(createCard(p,'pan')));
    bolleria.forEach(p=>bollGrid.appendChild(createCard(p,'boll')));
    empanadas.forEach(p=>empGrid.appendChild(createCard(p,'emp')));
  }
  renderAll();

  // language toggle function (switches between 'es' and 'pt')
  function toggleLang(){
    currentLang = currentLang === 'es' ? 'pt' : 'es';
    document.getElementById('langToggle').textContent = currentLang === 'es' ? 'PT' : 'ES';
    document.getElementById('mobileLang').textContent = currentLang === 'es' ? 'PT' : 'ES';
    tApply(currentLang);
    // rerender images with text thumbnails (they include name text)
    renderAll();
  }

  // simple anchor smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        overlay.hidden = true;
      }
    });
  });

  // micro accessibility: focus visible states
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape') overlay.hidden = true;
  });

  // animate SVG stages by monitoring time (simple)
  const dough = document.querySelector('.bread-anim .dough');
  const shaped = document.querySelector('.bread-anim .shaped');
  const loaf = document.querySelector('.bread-anim .loaf');
  let step = 0;
  setInterval(()=>{
    step = (step+1)%3;
    if(step===0){ dough.style.opacity=1; shaped.style.opacity=0; loaf.style.opacity=0; }
    if(step===1){ dough.style.opacity=0; shaped.style.opacity=1; loaf.style.opacity=0; }
    if(step===2){ dough.style.opacity=0; shaped.style.opacity=0; loaf.style.opacity=1; }
  }, 1800);
});
