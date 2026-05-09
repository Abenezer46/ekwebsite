// assets/js/projects.js
async function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const response = await fetch('./data/projects.json');
    const projects = await response.json();

    container.innerHTML = projects
      .map((project) => {
        // Check if it's a large or small card based on our JSON 'size'
        const isLarge = project.size === 'large';
        const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';

        return `
                <div class="${colSpan} bg-surface border border-outline-variant group overflow-hidden relative">
                    <div class="aspect-video w-full overflow-hidden bg-surface-container">
                        <img src="${project.image}" alt="${project.title}" 
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    </div>
                    <div class="p-stack-lg">
                        <div class="flex items-center gap-stack-sm mb-stack-sm">
                            <span class="font-label-caps text-[10px] text-primary bg-primary-fixed px-2 py-1 rounded-full">
                                ${project.status}
                            </span>
                            <span class="font-label-caps text-label-caps text-outline">REF: ${project.id}</span>
                        </div>
                        <h3 class="font-headline-md text-headline-md text-primary mb-stack-md">${project.title}</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant mb-stack-md">${project.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${project.tags.map((tag) => `<span class="border border-outline-variant px-3 py-1 font-label-caps text-[10px] text-secondary">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
      })
      .join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = `<p class="col-span-12 text-center py-20 text-error">Failed to load engineering portfolio. Please refresh.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', renderProjects);
