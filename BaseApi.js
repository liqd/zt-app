const baseUrl = 'https://aplus-dev.liqd.net/api';

const endpoints = {
  ideas: baseUrl + '/modules/$moduleId/ideas',
  liveQuestions: baseUrl + '/modules/$moduleId/interactiveevents/livequestions/',
  login: baseUrl + '/login/',
  projects: baseUrl + '/app-projects/'
};

const makeGetRequest = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(unpackedData => unpackedData)
    .catch(error => console.error(error));
};

const makePostRequest = (url, data = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.error(error));
};


const API = {
  getIdeas(moduleId) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId);
    return makeGetRequest(url);
  },

  /*
    this is just for testing post requests, example call
    (eg inside useEffect in IdeaPage) would be

          const liveQuestionData = {
            text: 'Live Question posted via API',
            category: 79
          }
          API.postLiveQuestion(238, liveQuestionData)

    then go to
    https://aplus-dev.liqd.net/rines-test-orga/interactiveevents/interactive-event-4/
    and see that question has been posted

    */
  postLiveQuestion(moduleId, data) {
    const url = endpoints.liveQuestions.replace(/\$(\w+?)\b/g, moduleId);
    return makePostRequest(url, data);
  },
  postLogin(data) {
    return makePostRequest(endpoints.login, data);
  },
  getProjects() {
    return makeGetRequest(endpoints.projects);
  }
};

export default API;
