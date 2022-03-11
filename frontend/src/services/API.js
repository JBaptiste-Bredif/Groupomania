import router from '@/router/index'
const internError = "Pas de réponse du serveur !"
class API_CONSTRUCTOR {
  constructor() {
    this.baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000/api"
  }

  headers(options = {}) {
    const contentType = options.isFormData ? {} : { 'Content-Type': 'application/json' }
    return {
      ...contentType,
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  get(path) {
    return fetch(this.baseUrl + path, {
      method: 'GET',
      headers: this.headers()
    })
      .then(response => this.handleResponse(response))
      .catch(() => alert(internError))
  }

  post(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    })
      .then(response => this.handleResponse(response))
      .catch(() => alert(internError))
  }

  delete(path, body) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: this.headers()
    })
      .then(response => this.handleResponse(response))
      .catch(() => alert(internError))
  }

  put(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'PUT',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    })
      .then(response => this.handleResponse(response))
      .catch(() => alert(internError))
  }

  async handleResponse(response) {
    if (response.status == 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    if (response.status == 500) {
      throw await response.json()
    }
    return response.json()
  }
}

export const API = new API_CONSTRUCTOR()