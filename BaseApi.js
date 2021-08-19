// const baseUrl = 'http://10.0.2.2:8004/api';
const baseUrl = 'https://aplus-dev.liqd.net/api';

const endpoints = {
  ideas: baseUrl + '/modules/$moduleId/ideas/',
  idea: baseUrl + '/modules/$moduleId/ideas/$ideaPk/',
  login: baseUrl + '/login/',
  projects: baseUrl + '/app-projects/',
  modules: baseUrl + '/app-modules/',
  rate: baseUrl + '/contenttypes/$contentTypeId/objects/$objectPk/ratings/',
  comments: baseUrl + '/contenttypes/$contentTypeId/objects/$objectPk/comments/',
};

const makeGetRequest = (url, token=null) => {
  return fetch(url, {
    method: 'GET',
    headers: getHeaders(token)
  })
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

const makePutRequest = (url, data = {}, token=null) => {
  return fetch(url, {
    method: 'PUT',
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

const makeDeleteRequest = (url, token=null) => {
  return fetch(url, {
    method: 'DELETE',
    headers: getHeaders(token)
  })
    .then(response => response)
    .catch(error => console.error(error));
};

const API = {
  getIdea(moduleId, ideaId, token=null) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId);
    const url = module_url.replace('$ideaPk', ideaId);
    return makeGetRequest(url, token);
  },
  getIdeas(moduleId, token=null) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId);
    return makeGetRequest(url, token);
  },
  postIdea(moduleId, data, token=null) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId);
    return makePostRequest(url, data, token);
  },
  deleteIdea(moduleId, ideaPk, token=null) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId);
    const url = module_url.replace('$ideaPk', ideaPk);
    return makeDeleteRequest(url, token);
  },
  editIdea(moduleId, ideaPk, data, token=null) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId);
    const url = module_url.replace('$ideaPk', ideaPk);
    return makePutRequest(url, data, token);
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
  getModule(moduleId, token=null) {
    const url = endpoints.modules + moduleId;
    return makeGetRequest(url, token);
  },
  rate(contentTypeId, objectPk, data, token=null) {
    const ct_url = endpoints.rate.replace('$contentTypeId', contentTypeId);
    const url = ct_url.replace('$objectPk', objectPk);
    return makePostRequest(url, data, token);
  },
  changeRating(contentTypeId, objectPk, ratingId, data, token=null) {
    const ct_url = endpoints.rate.replace('$contentTypeId', contentTypeId);
    const url = ct_url.replace('$objectPk', objectPk) + ratingId +'/';
    return makePutRequest(url, data, token);
  },
  getComments(contentTypeId, objectPk) {
    const ct_url = endpoints.comments.replace('$contentTypeId', contentTypeId);
    const url = ct_url.replace('$objectPk', objectPk);
    return makeGetRequest(url);
  }
};

export default API;
