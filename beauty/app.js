/* If another website tries to show this page inside a frame, break out and open it on its own. */
if (window.top !== window.self) {
  try { window.top.location = window.self.location.href; }
  catch (e) { document.documentElement.style.display = 'none'; }
}

/* ===== EDIT YOUR SHADES HERE =====
   name   = shade name under the pan
   cls    = finish + colour ("matte m-..." or "shimmer s-...")
   org    = company / project
   meta   = role · details · dates
   roles  = one entry per role; title/when only show when there is more than one role
   link   = optional link shown at the end of the card
*/
const PANS = [
  { name:'Field Day', cls:'matte m-terracotta', org:'Raymond Lifestyle', meta:'Management Trainee · Suiting Fabric Sales · Aug 2026 – Present', roles:[{ bullets:[
    'Leading an MBO (multi-brand outlet) channel-partner classification project for the suiting fabric business.',
    'Visited 38 MBO counters across the country and analysed three years of sales data.',
    'Building a tiering framework on volume, value and average selling price, tagged at the individual counter level.',
    'Linking each tier to differentiated interventions, to answer whether to service fewer counters or grow business at existing ones.'] }] },

  { name:'Category Crush', cls:'shimmer s-gold', org:'Tata CLiQ Luxury', meta:'Apr – Jul 2026 · two roles', roles:[
    { title:'Category Management Intern', when:'Indiluxe · Apr – Jun 2026', bullets:[
      'Analysed GMV, pricing and brand performance across 7 luxury categories and 450+ brands to support category growth and merchandising decisions.',
      'Tracked year-on-year category growth across the Indiluxe portfolio, surfacing high-growth verticals and underperforming categories.',
      'Built an 8-segment customer segmentation framework based on purchase frequency and discount sensitivity.',
      'Ran consumer insight and pricing evaluations, translating findings into category strategy recommendations.'] },
    { title:'Marketing Intern, Lululemon India launch', when:'Jul 2026', bullets:[
      'Built a community activation partner deck for the Lululemon launch in India.',
      'Built a deck pitching a Tata CLiQ wellness IP to Amex.'] }] },

  { name:'Derm Approved', cls:'shimmer s-pink', org:'Galderma', meta:'Brand & Marketing Intern · Prescription Skincare · Jan – Mar 2026', roles:[{ bullets:[
    'Benchmarked competitors across drugstore, high-end and derma-cosmetic categories for a sensitive-scalp haircare launch, comparing packaging, price points and product claims to inform GTM positioning.',
    'Worked with 15+ sales associates and RBMs/DSMs nationwide to build and maintain a hospital camp performance tracker, giving region-by-region visibility into targets and planned units.'] }] },

  { name:'Closed the Deal', cls:'matte m-emerald', org:'Tata Sons', meta:'Brand & Marketing Intern · Customer Centricity Award Program · Apr – Jun 2025', roles:[{ bullets:[
    'Took end-to-end ownership of vendor selection and onboarding for a 76K+ certificate project.',
    'Negotiated a 52% cost reduction (₹12L to ₹5.8L) while maintaining data security compliance.',
    'Managed vendor coordination, UX copy and story curation for the award program and internal communications.'] }] },

  { name:'Series A', cls:'shimmer s-teal', org:'Bifrost AI', meta:"Strategy Analyst Intern, Founders' Office · Gen AI SaaS · Apr – Jun 2024", roles:[{ bullets:[
    'Owned GTM planning across 200+ accounts in 4 verticals.',
    'Coordinated cross-functional execution across product, sales and communications teams.',
    'Drove coverage across 15 global media outlets for the Series A fundraise.'] }] },

  { name:'Copy That', cls:'matte m-hotpink', org:'Weber Shandwick', meta:'Senior Copywriter · Castrol, Kotak, L&T, ABB, Novartis, South African Tourism · Sep 2020 – Jan 2023', roles:[{ bullets:[
    'Delivered 8.3M+ campaign views for MNC clients through integrated campaigns, social media strategy and branded content.',
    'Grew social media audience by 460% through consumer insight-led messaging, audience targeting and platform-specific content.',
    'Led pitch strategy and RFP development that contributed to ₹55 lakh in new business, working across creative, strategy and client servicing.'] }] },

  { name:'Forecast', cls:'shimmer s-holo', org:'GlowCast Pro', meta:'Self-built AI prototype · D2C skincare', link:{ href:'https://glowcast-pro.vercel.app/', text:'See it live' }, roles:[{ bullets:[
    'Spotted a gap: skincare efficacy shifts with climate and weather, yet most product recommendations stay generic.',
    "Designed an AI-powered prototype that personalises suggestions from a user's existing routine and real-time weather."] }] },

  { name:'Aura', cls:'shimmer s-violet', org:"L'Oréal Brandstorm 2026", meta:'Case competition · Refillable fragrance pen concept', roles:[{ bullets:[
    'Developed Aura, a refillable fragrance pen concept, as part of a team.',
    'Designed the consumer questionnaire end to end and built most of the submission deck.'] }] },

  { name:'Saved for Later', cls:'matte m-cobalt', org:'Bombay Bound', meta:'Self-built app · Mumbai places and events saver', roles:[{ bullets:[
    'Built a personal app that turns places and events saved from social media into one organised Mumbai list.',
    'Paste a link or upload a screenshot, and AI extracts the place details for a quick review before saving.',
    'Browse saved spots on a map with status pins or as a grouped list with CSV export; installs on a phone like an app.',
    'Designed it around a vintage Bombay street-signage look.'] }] },

  { name:'Full Kit', cls:'matte m-nude', org:'Skills & tools', meta:'What I bring to the brief', roles:[{ bullets:[
    'Category management · GMV & pricing analysis · Consumer insights & segmentation',
    'Competitor benchmarking · GTM planning · Brand communications',
    'Channel partner analysis · Vendor & stakeholder management',
    'Tools: MS Excel (pivot tables), Google Analytics'] }] },

  { name:'Top of Class', cls:'matte m-lilac', org:'Education', meta:'MBA · B.A. · ISC', roles:[{ bullets:[
    'MBA, BITS School of Management (BITSoM), Mumbai · 3.41/4.0 · 2026 · Marketing & Consumer Insights, E-commerce, Digital Leadership.',
    'B.A. Psychology & English Literature, Sophia College for Women, Mumbai · 8.46/10 · 2020 · Gill Mohan Prize, Rank 2, Dept. of English.',
    "ISC, Bombay Scottish School (Mahim) · 94.40% · 2015 · Chairman's Commendation, ISC Humanities topper."] }] },

  { name:'Say Hello', cls:'matte m-ink', org:'Contact', meta:'Mumbai, India', link:{ href:'https://www.linkedin.com/in/abigail-barretto', text:'LinkedIn: linkedin.com/in/abigail-barretto' }, roles:[{ bullets:[
    'Email: YOUR_EMAIL_HERE'] }] }
];

/* ===== Page behaviour (no need to edit below) ===== */
const grid = document.getElementById('grid');
const card = document.getElementById('card');
const rolesBox = document.getElementById('card-roles');
let current = null;

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

PANS.forEach((p) => {
  const b = el('button', 'cell');
  b.type = 'button';
  b.setAttribute('aria-label', p.name + ', ' + p.org);
  b.appendChild(el('span', 'pan ' + p.cls));
  b.appendChild(el('span', 'cap', p.name));
  b.addEventListener('click', () => openCard(p, b));
  grid.appendChild(b);
});

function openCard(p, btn) {
  if (current) current.classList.remove('sel');
  current = btn;
  btn.classList.add('sel');
  document.getElementById('card-chip').className = 'chip ' + p.cls;
  document.getElementById('card-name').textContent = p.name;
  document.getElementById('card-org').textContent = p.org;
  document.getElementById('card-meta').textContent = p.meta;

  rolesBox.replaceChildren();
  const many = p.roles.length > 1;
  p.roles.forEach((r) => {
    const box = el('div', 'role');
    if (many) {
      const h = el('h3', 'role-head', r.title + ' ');
      h.appendChild(el('span', 'role-when', '· ' + r.when));
      box.appendChild(h);
    }
    const ul = el('ul', 'items');
    r.bullets.forEach((t) => ul.appendChild(el('li', '', t)));
    box.appendChild(ul);
    rolesBox.appendChild(box);
  });
  if (p.link) {
    const a = el('a', '', p.link.text);
    a.href = p.link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    rolesBox.appendChild(a);
  }

  card.hidden = false;
  card.scrollTop = 0;
}

function closeCard() {
  card.hidden = true;
  if (current) { current.classList.remove('sel'); current.focus(); current = null; }
}

document.getElementById('close').addEventListener('click', closeCard);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !card.hidden) closeCard(); });
