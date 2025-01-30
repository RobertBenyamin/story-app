const urlRoutes = {
  404: {
    template: 'not-found',
  },
  '': {
    template: 'dashboard-page',
  },
  '/': {
    template: 'dashboard-page',
  },
  '/add': {
    template: 'add-story-page',
  },
  '/about': {
    template: 'about-page',
  },
};

const locationHandler = async () => {
  const path = window.location.hash.replace('#', '');
  const route = urlRoutes[path] || urlRoutes[404];
  const html = route.template;

  const main = document.querySelector('#content');
  main.innerHTML = `<${html}></${html}>`;
};

export const router = () => {
  window.addEventListener('hashchange', locationHandler);
  window.addEventListener('load', locationHandler);
};