document.addEventListener('DOMContentLoaded', () => {
  const articleForm = document.getElementById('articleForm');
  const articlesContainer = document.getElementById('articlesContainer');
  const contactForm = document.getElementById('contactForm');

  // Store articles locally
  if (articleForm) {
    articleForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      if (title && content) {
        const articleEl = document.createElement('div');
        articleEl.classList.add('card');
        articleEl.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        articlesContainer.appendChild(articleEl);
        articleForm.reset();
      }
    });
  }

  // Simulate contact form submit
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for contacting Civil City!');
      contactForm.reset();
    });
  }
});
