export const baseUrl = 'https://auth.nomoreparties.co';

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({password, email})
  })
  .then(res => getResponseData(res))
}

export function authorize(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({password, email})
  })
  .then(res => getResponseData(res))
}

export function getValidData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => getResponseData(res))
}
