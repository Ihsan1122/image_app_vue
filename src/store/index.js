import { createStore } from 'vuex'
import * as authApi from '../api/auth'
import * as entriesApi from '../api/entries'

export default createStore({
  state: {
    auth: {
      token: null,
      user: {},
      isAuthenticated: false,
      permissions: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.auth.token = token
      state.auth.isAuthenticated = !!token
      if (token) {
        localStorage.setItem('authToken', token)
        localStorage.setItem('isAuthenticated', 'true')
      } else {
        localStorage.removeItem('authToken')
        localStorage.setItem('isAuthenticated', 'false')
      }
    },
    setUser(state, user) {
      state.auth.user = user
      state.auth.permissions = user.permissions;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setPermissions(state, permissions) {
        state.auth.permissions = permissions;
        localStorage.setItem('userPermissions', JSON.stringify(permissions));
      },
    logout(state) {
      state.auth.token = null
      state.auth.user = {}
      state.auth.isAuthenticated = false
      localStorage.removeItem('authToken')
      localStorage.setItem('isAuthenticated', 'false')
      localStorage.removeItem('user');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const data = await authApi.login(credentials)
        commit('setToken', data.token.token)
        commit('setUser', data.user)
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async register({ commit }, credentials) {
      try {
        const data = await authApi.register(credentials)
        commit('setToken', data.token.token)
        commit('setUser', data.user)
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },
    logout({ commit }) {
      authApi.logout()
      commit('logout')
    },
    initializeAuth({ commit }) {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token) {
        commit('setToken', token);
        if (user) {
          commit('setUser', user);
        }
        // Optionally, you can fetch the user data from the server using the token
      }
    }
  }
})
