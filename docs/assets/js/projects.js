(async () => {
  const container = document.getElementById('projects-list');
  if (!container) return;

  try {
    const resp = await fetch('data/projects.json');
    if (!resp.ok) throw new Error('fetch failed');
    const projects = await resp.json();

    container.innerHTML = projects.map((p, i) => `
      <div class="bg-paper-high border border-rule flex flex-col card-hover" style="animation: fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both;">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" class="project-card-img" loading="lazy" />` : ''}
        <div class="p-6 flex flex-col flex-grow">
          <span class="font-outlier text-xs text-accent tracking-widest block mb-stack-sm">${p.id}</span>
          <div class="flex flex-wrap gap-2 mb-stack-md">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <h3 class="font-display text-heading-sm font-bold text-ink mb-stack-sm">${p.title}</h3>
          <p class="font-body text-sm text-ink-dim mb-stack-lg flex-grow">${p.description}</p>
          <div class="pt-stack-md border-t border-rule">
            <span class="font-label-caps text-label-caps text-ink-dim tracking-widest">STATUS</span>
            <span class="block font-body text-sm text-ink font-bold mt-1">${p.status}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p class="font-body text-ink-dim col-span-full text-center">Could not load projects.</p>';
  }
})();
