document.addEventListener('DOMContentLoaded', () => {
    // Project Rendering Logic
    const projectsGrid = document.getElementById('view-projects-grid');
    if (projectsGrid) {
        fetch('./storage.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(projects => {
                projectsGrid.innerHTML = projects.map(p => `
                    <article class="project-card">
                        <div class="card-top">
                            <img src="${p.logo}" alt="${p.brand} logo" class="card-logo">
                            <h2>${p.slogan}</h2>
                        </div>
                        <p class="card-desc">${p.desc}</p>
                        <div class="tag-row">
                            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <div class="card-footer">
                            <div class="footer-links">
                                <a href="${p.code}"><code>&lt;/&gt;</code> code</a>
                            </div>
                            <a href="${p.url}" class="details-link">Details &rarr;</a>
                        </div>
                    </article>
                `).join('');
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                projectsGrid.innerHTML = '<p style="color: red;">Failed to load projects. Please try again later.</p>';
            });
    }

    // Interactive mouse glow effect for bento cells
    const bentoCells = document.querySelectorAll('.bento-cell, .project-card');
    document.addEventListener('mousemove', (e) => {
        bentoCells.forEach(cell => {
            const rect = cell.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only apply effect if mouse is near or inside the cell
            if (x > -100 && x < rect.width + 100 && y > -100 && y < rect.height + 100) {
                cell.style.background = `
                    radial-gradient(
                        800px circle at ${x}px ${y}px, 
                        rgba(255,255,255,0.06),
                        transparent 40%
                    ),
                    var(--bento-bg)
                `;
            } else {
                cell.style.background = 'var(--bento-bg)';
            }
        });
    });
});