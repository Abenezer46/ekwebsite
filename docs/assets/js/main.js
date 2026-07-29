function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = '/' + href;
    if (path === linkPath || path.endsWith('/' + href)) {
      link.classList.add('text-accent-ink');
      link.classList.remove('text-accent-ink/70');
    }
  });
}

function setupMobileToggle() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

async function loadComponent(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('fetch failed');
    el.innerHTML = await resp.text();
  } catch {
    el.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('navbar-placeholder', 'components/navbar.html');
  await loadComponent('footer-placeholder', 'components/footer.html');
  highlightActiveNav();
  setupMobileToggle();
});
