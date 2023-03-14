import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Device from 'expo-device'

export const baseUrl = (() => {
  /*global __DEV__*/
  if (__DEV__) {
    if (Constants?.expoConfig?.extra?.localAPI) {

      // current workaround as long as isDevice=true for emulators
      const isEmulator = Device.productName && Device.productName.includes('emulator')
      // In case of Apple real device or simulator
      const isApple = Device.manufacturer === 'Apple'
      // In case of Apple Simulator
      const isSimulator = isApple && !Device.isDevice

      if ((Device.isDevice && !isEmulator) || isApple) {
        if (!isSimulator) {
          // In case of Apple Iphone (physical) use your local IP
          return 'http://192.168.2.174:8004'
        }
        return 'http://localhost:8004'
      }
      return 'http://10.0.2.2:8004'
    }
    return 'https://aplus-dev.liqd.net'
  } else {
    switch (Constants?.expoConfig?.releaseChannel) {
      case 'prod':
      case 'default':
        return 'https://aplus-app.liqd.net'
      case 'stage':
        return 'https://aplus-stage.liqd.net'
      case 'dev':
      default:
        return 'https://aplus-dev.liqd.net'
    }
  }
})()

const baseApiUrl = baseUrl + '/api'

const endpoints = {
  account: baseApiUrl + '/account/',
  comments: baseApiUrl + '/contenttypes/$contentTypeId/objects/$objectPk/comments/',
  comment: baseApiUrl + '/contenttypes/$contentTypeId/objects/$objectPk/comments/$commentPk/',
  ideas: baseApiUrl + '/modules/$moduleId/ideas/',
  idea: baseApiUrl + '/modules/$moduleId/ideas/$ideaPk/',
  login: baseApiUrl + '/login/',
  project: baseApiUrl + '/app-projects/$project',
  module: baseApiUrl + '/app-modules/$moduleId/',
  projects: baseApiUrl + '/app-projects/',
  ratings: baseApiUrl + '/contenttypes/$contentTypeId/objects/$objectPk/ratings/',
  rating: baseApiUrl + '/contenttypes/$contentTypeId/objects/$objectPk/ratings/$ratingId/',
  report: baseApiUrl + '/reports/',
  user: baseApiUrl + '/users/$userPk/',
}

const getHeaders = async (isFormData = false) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
  }
  const token = await AsyncStorage.getItem('authToken')
  if (token) {
    headers['Authorization'] = 'Token ' + token
  }
  return headers
}

const makeGetRequest = (url) => {
  return getHeaders()
    .then(headers => fetch(url, {
      method: 'GET',
      headers: headers
    }))
    .then(response => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([ statusCode, data ])
    })
    .then(values => {
      return {statusCode: values[0], data: values[1]}
    })
    .catch(error => console.error(error))
}

const makePostRequest = (url, data = {}) => {
  const isFormData = data instanceof FormData
  return getHeaders(isFormData)
    .then(headers => fetch(url, {
      method: 'POST',
      headers: headers,
      body: isFormData ? data : JSON.stringify(data)
    }))
    .then(response => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([ statusCode, data ])
    })
    .then(values => {
      return {statusCode: values[0], data: values[1]}
    })
    .catch(error => console.error(error))
}

const makePutRequest = (url, data = {}) => {
  const isFormData = data instanceof FormData
  return getHeaders(isFormData)
    .then(headers => fetch(url, {
      method: 'PUT',
      headers: headers,
      body: isFormData ? data : JSON.stringify(data)
    }))
    .then(response => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([ statusCode, data ])
    })
    .then(values => {
      return {statusCode: values[0], data: values[1]}
    })
    .catch(error => console.error(error))
}

const makeDeleteRequest = (url) => {
  return getHeaders()
    .then(headers => fetch(url, {
      method: 'DELETE',
      headers: headers
    }))
    .then(response => {
      const statusCode = response.status
      let data
      statusCode == 204 ? data = {} : data = response.json()
      return Promise.all([ statusCode, data ])
    })
    .then(values => {
      return {statusCode: values[0], data: values[1]}
    })
    .catch(error => console.error(error))
}

export function getUser(userPk) {
  let url
  if (userPk) {
    url = endpoints.user.replace('$userPk', userPk)
  } else {
    url = endpoints.account
  }
  return makeGetRequest(url)
}

const API = {
  getIdea(moduleId, ideaId) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId)
    const url = module_url.replace('$ideaPk', ideaId)
    return makeGetRequest(url)
  },
  getIdeas(moduleId) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId)
    return makeGetRequest(url)
  },
  postIdea(moduleId, formData) {
    const url = endpoints.ideas.replace(/\$(\w+?)\b/g, moduleId)
    return makePostRequest(url, formData)
  },
  deleteIdea(moduleId, ideaPk) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId)
    const url = module_url.replace('$ideaPk', ideaPk)
    return makeDeleteRequest(url)
  },
  editIdea(moduleId, ideaPk, data) {
    const module_url = endpoints.idea.replace('$moduleId', moduleId)
    const url = module_url.replace('$ideaPk', ideaPk)
    return makePutRequest(url, data)
  },
  postReport(data) {
    return makePostRequest(endpoints.report, data)
  },
  postLogin(data) {
    return makePostRequest(endpoints.login, data)
  },
  getProjects() {
    return makeGetRequest(endpoints.projects)
  },
  getProject(project) {
    const url = endpoints.project.replace('$project', project)
    return makeGetRequest(url)
  },
  getModule(moduleId) {
    const url = endpoints.module.replace('$moduleId', moduleId)
    return makeGetRequest(url)
  },
  postRating(contentTypeId, objectPk, data) {
    const ct_url = endpoints.ratings.replace('$contentTypeId', contentTypeId)
    const url = ct_url.replace('$objectPk', objectPk)
    return makePostRequest(url, data)
  },
  changeRating(contentTypeId, objectPk, ratingId, data) {
    const ct_url = endpoints.rating.replace('$contentTypeId', contentTypeId)
    const ct_obj_url = ct_url.replace('$objectPk', objectPk)
    const url = ct_obj_url.replace('$ratingId', ratingId)
    return makePutRequest(url, data)
  },
  getComments(contentTypeId, objectPk) {
    const ct_url = endpoints.comments.replace('$contentTypeId', contentTypeId)
    const url = ct_url.replace('$objectPk', objectPk)
    return makeGetRequest(url)
  },
  getComment(contentTypeId, objectPk, commentPk) {
    const ct_url = endpoints.comment.replace('$contentTypeId', contentTypeId)
    const ct_obj_url = ct_url.replace('$objectPk', objectPk)
    const url = ct_obj_url.replace('$commentPk', commentPk)
    return makeGetRequest(url)
  },
  addComment(contentTypeId, objectPk, data) {
    const ct_url = endpoints.comments.replace('$contentTypeId', contentTypeId)
    const url = ct_url.replace('$objectPk', objectPk)
    return makePostRequest(url, data)
  },
  editComment(contentTypeId, objectPk, commentPk, data) {
    const ct_url = endpoints.comment.replace('$contentTypeId', contentTypeId)
    const ct_obj_url = ct_url.replace('$objectPk', objectPk)
    const url = ct_obj_url.replace('$commentPk', commentPk)
    return makePutRequest(url, data)
  },
  deleteComment(contentTypeId, objectPk, commentPk) {
    const ct_url = endpoints.comment.replace('$contentTypeId', contentTypeId)
    const ct_obj_url = ct_url.replace('$objectPk', objectPk)
    const url = ct_obj_url.replace('$commentPk', commentPk)
    return makeDeleteRequest(url)
  },
  editUser(data) {
    const url = endpoints.account
    return makePutRequest(url, data)
  },
}

export default API
