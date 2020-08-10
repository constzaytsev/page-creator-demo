import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePage: null,
    pages: [
      {
        id: 1,
        title: 'page 1'
      },
      {
        id: 2,
        title: 'page 2'
      }
    ]
  },
  getters: {
    activePageDetails: state => state.pages.find(e => e.id === state.activePage)
  },
  mutations: {
    setActivePage (state, id) {
      state.activePage = id
    },
    addPage (state, title = 'Title') {
      state.pages.push({
        id: `f${(+new Date()).toString(16)}`,
        title
      })
    }
  },
  actions: {
    setActivePage ({ state, commit }, id) {
      if (id !== state.activePage) {
        commit('setActivePage', id)
        router.push({ name: 'ProjectPage', params: { pageId: id } })
      }
    },
    addPage ({ commit }) {
      commit('addPage')
    }
  },
  modules: {
  }
})
