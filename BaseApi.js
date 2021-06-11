const baseUrl = 'https://aplus-dev.liqd.net/api';

const endpoints = {
  ideas: baseUrl + '/modules/$moduleId/ideas/',
  login: baseUrl + '/login/',
  projects: baseUrl + '/app-projects/',
  modules: baseUrl + '/app-modules/'
};

const makeGetRequest = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(unpackedData => unpackedData)
    .catch(error => console.error(error));
};

const getHeaders = (token) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = 'Token '+token;
  }
  return headers;
};

const makePostRequest = (url, data = {}, token=null) => {
  return fetch(url, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(values => {
      return {'statusCode': values[0], 'data': values[1]};
    })
    .catch(error => console.error(error));
};

const API = {
  getIdeas(moduleId) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId);
    return makeGetRequest(url);
  },
  postIdea(moduleId, data, token=null) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId);
    return makePostRequest(url, data, token);
  },
  postLogin(data) {
    return makePostRequest(endpoints.login, data);
  },
  getProjects() {
    return makeGetRequest(endpoints.projects);
  },
  getModules() {
    return makeGetRequest(endpoints.modules);
  },
  getModule(moduleId) {
    const url = endpoints.modules + moduleId;
    return makeGetRequest(url);
  }
};

export default API;
