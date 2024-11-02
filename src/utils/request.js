import Cookies from 'js-cookie'

const API_DOMAIN = 'http://localhost:8080/'
const tokenAdmin = Cookies.get('tokenAdmin')
const tokenStudent = Cookies.get('tokenStudent')
export const get = async (patch) => {
  const response = await fetch(API_DOMAIN + patch)
  const result = response.json()
  return result
}

// fetchAPI admin
export const getListChat = async (patch) => {
  const response = await fetch(API_DOMAIN + patch, {
    Authorization: `Bearer ${tokenAdmin}`
  })
  const result = response.json()
  return result
}
export const postAdmin = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = response.json()
  return result
}
export const delAdmin = async (patch) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${tokenAdmin}`,
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export const patchAdmin = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = await response.json()
  return result
}

export const putAdmin = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = await response.json()
  return result
}

// fetAPI student
export const getChatByIdUser = async (patch) => {
  const response = await fetch(API_DOMAIN + patch, {
    Authorization: `Bearer ${tokenStudent}`
  })
  const result = response.json()
  return result
}
export const postStudent = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStudent}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = response.json()
  return result
}
export const delStudent = async (patch) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'DELETE',
    Authorization: `Bearer ${tokenStudent}`,
    'Content-Type': 'application/json'
  })
  const result = await response.json()
  return result
}

export const patchStudent = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStudent}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = await response.json()
  return result
}

export const putStudent = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStudent}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = await response.json()
  return result
}

export const postNotNeedToken = async (patch, option) => {
  const response = await fetch(API_DOMAIN + patch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
  const result = response.json()
  return result
}
