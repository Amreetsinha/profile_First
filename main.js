// main.js — improved theme switch + smooth scroll + skill animations

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.querySelector('.theme-toggle');
  const icon = toggleBtn.querySelector('.icon');
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.textContent = '☀️'; // show sun icon in dark mode
  } else {
    icon.textContent = '🌙'; // show moon icon in light mode
  }

  // Theme toggle
  toggleBtn?.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.textContent = isDark ? '☀️' : '🌙';
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        target?.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', targetId);
      }
    });
  });

  // Animate skill bars
  const skills = document.querySelectorAll('.skill[data-prog]');
  skills.forEach(skill => {
    const prog = skill.getAttribute('data-prog');
    const bar = document.createElement('span');
    bar.style.position = 'absolute';
    bar.style.left = 0;
    bar.style.top = 0;
    bar.style.height = '100%';
    bar.style.width = '0%';
    bar.style.background = 'var(--accent)';
    bar.style.transition = 'width 1s ease-out';
    bar.style.opacity = 0.2;
    skill.appendChild(bar);
    requestAnimationFrame(() => {
      bar.style.width = prog + '%';
    });
  });
});
