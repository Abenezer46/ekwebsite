async function loadComponent(elementId, filePath) {
  try {
    const url = new URL(filePath, window.location.href).href;
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const content = await response.text();
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = content;

    if (elementId === 'navbar-placeholder') {
      highlightActiveLink();
      setupMobileMenu();
    }
  } catch (e) {
    console.error('Error loading component:', filePath, e);
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = '<!-- Component failed to load: ' + filePath + ' -->';
    }
  }
}

function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === page) {
      link.classList.add('text-primary', 'border-primary');
      link.classList.remove('text-secondary');
      if (!link.closest('#mobile-menu'))
        link.classList.add('border-b-2', 'pb-1');
      else link.classList.add('border-l-2');
    }
  });
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  if (btn && menu) {
    btn.onclick = () => {
      const isHidden = menu.classList.toggle('hidden');
      if (icon) icon.textContent = isHidden ? 'menu' : 'close';
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', 'components/navbar.html');
  loadComponent('footer-placeholder', 'components/footer.html');
});
