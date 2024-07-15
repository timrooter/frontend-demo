import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const backApi = {
  authenticate,
  signup,
  numberOfUsers,
  getUserMe,
  getCurrentExchangeRates,
  transferCurrency,
  getAllTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
  getUserById,
  updateUser,
  deleteUser,
  getWalletById,
  getBankCardForCurrentUser
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}

function numberOfUsers() {
  return instance.get('/public/numberOfUsers')
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


// -- Bank Card API functions

function getBankCardForCurrentUser(user) {
  return instance.get('/api/card', {
    headers: { 'Authorization': bearerAuth(user) }
  });
}


// -- Exchange Rates API functions

function getAllExchangeRates() {
  return instance.get('/api/exchange-rates');
}

function getExchangeRateById(id) {
  return instance.get(`/api/exchange-rates/${id}`);
}

function createExchangeRate(exchangeRateDto) {
  return instance.post('/api/exchange-rates', exchangeRateDto, {
    headers: { 'Content-type': 'application/json' }
  });
}

function updateExchangeRate(id, exchangeRateDto) {
  return instance.put(`/api/exchange-rates/${id}`, exchangeRateDto, {
    headers: { 'Content-type': 'application/json' }
  });
}

function deleteExchangeRate(id) {
  return instance.delete(`/api/exchange-rates/${id}`);
}

function getCurrentExchangeRates() {
  return instance.get('/api/exchange-rates/current');
}

// -- Wallet API functions

function getWalletById(user) {
  return instance.get('/api/wallets', {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function transferCurrency(user, fromCurrency, toCurrency, amount) {
  return instance.post('/api/wallets/transfer', {
    fromCurrency,
    toCurrency,
    amount
  }, {
    headers: { 'Content-type': 'application/json', 'Authorization': bearerAuth(user) }
  });
}

// -- Transaction API functions

function getAllTransactions(user) {
  return instance.get('/api/transactions', {
    headers: { 'Authorization': bearerAuth(user) }
  });
}



function createTransaction(transaction, user) {
  return instance.post('/api/transactions', transaction, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });
}

function getTransactionById(id, user) {
  return instance.get(`/api/transactions/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function deleteTransaction(id, user) {
  return instance.delete(`/api/transactions/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

// -- User API functions

function getUserById(id, user) {
  return instance.get(`/api/users/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function updateUser(id, userDto, user) {
  return instance.put(`/api/users/${id}`, userDto, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });
}

function deleteUser(id, user) {
  return instance.delete(`/api/users/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
