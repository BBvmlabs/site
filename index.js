const greetings = [
    { t: "Hello", s: "sans-serif" },
    { t: "Vanakkam", s: "serif" },
    { t: "Namaste", s: "serif" },
    { t: "Bonjour", s: "sans-serif" },
    { t: "Ciao", s: "sans-serif" }
];

// Splash Logic (only for index.html)
document.addEventListener('DOMContentLoaded', () => {
    // URL Masking: Change 'project.html' to 'projects' in the address bar
    // Note: Refreshing on '/projects' will 404 on GitHub Pages unless you use a 404.html redirect hack.
    // if (window.location.pathname.endsWith('project.html')) {
    //     // const newPath = window.location.pathname.replace('project.html', 'projects');
    //     window.history.replaceState(null, '', newPath);
    // }

    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        let gIdx = 0;
        const gEl = document.getElementById('greeting-text');
        const interval = setInterval(() => {
            if (gIdx >= greetings.length) {
                clearInterval(interval);
                splashScreen.style.opacity = '0';
                setTimeout(() => {
                    splashScreen.style.visibility = 'hidden';
                    // Trigger logo animation
                    const logo = document.querySelector('.logo');
                    if (logo) logo.classList.add('visible');
                }, 800);
                return;
            }
            gEl.classList.remove('animate-text');
            void gEl.offsetWidth; // Trigger reflow
            gEl.innerText = greetings[gIdx].t;
            gEl.style.fontFamily = greetings[gIdx].s;
            gEl.classList.add('animate-text');
            gIdx++;
        }, 400);
    }

    // Project Rendering Logic (only for project.html)
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
                            <h2>${p.slogan}</h2>
                            <div class="card-graphic"><img src=${p.logo} alt="${p.slogan}" class="card-logo" ></div>
                            <a href="${p.url}" class="card-get-started"> Get Started</a>
                        </div>
                        <div class="card-bottom">
                            <div class="card-brand">
                                <span>${p.brand}</span>
                            </div>
                            <p class="card-desc">${p.desc}</p>
                            <div class="tag-row">
                                ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                            <div class="card-footer">
                                <div class="footer-links">
                                    <a href="${p.code}"><code>&lt;/&gt;</code> code</a>
                                </div>
                                <a href="${p.url}" class="details-link">details &rarr;</a>
                            </div>
                        </div>
                    </article>
                `).join('');
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                projectsGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
            });
    }
});

// No switchView function needed as navigation is now page-based.