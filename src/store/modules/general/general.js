import { make } from 'vuex-pathify'
import api from '@/utils/api'

const state = {
  hosts: [],
  loadingHosts: false,
}

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  ...make.actions(state),
  async fetchHosts({ state }) {
    state.loadingHosts = true
    const response = await api.get('/hosts')
    if (response.ok) {
      state.hosts = response.data
    }
    state.loadingHosts = false
  },
  async addHost({ state }, hostSettings) {
    state.loadingHosts = true
    const response = await api.post('/hosts', hostSettings)
    if (response.ok) {
      state.hosts.push(response.data)
    }
    state.loadingHosts = false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
