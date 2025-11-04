document.addEventListener('DOMContentLoaded', () => {
  const modeSwitch = document.querySelector('#mode-switch');
  if (modeSwitch) {
    modeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  console.log('CivilCity site loaded successfully');
});
