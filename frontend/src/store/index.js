import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

export default createStore({
  state: {
    loggedIn: false,
    feeds: [],
    user: {},
    LoginError: false,
    LoginErrorMessage: "",
    profileUpdate: false,
    profileUpdateMessage: "",
    profileDelete: false,
    profileDeleteMessage: ""
  },
  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getLoggedUser: (state) => state.user,
    Feeds: (state) => state.feeds,
  },
  mutations: {
    LOGGINGERROR(state, payload) {
      state.LoginError = payload
    },
    LOGGINGERRORMESSAGE(state, payload) {
      state.LoginErrorMessage = payload
    },
    PROFILEUPLOADERROR(state, payload) {
      state.profileUpdate = payload
    },
    PROFILEUPLOADMESSAGE(state, payload) {
      state.profileUpdateMessage = payload
    },

    PROFILEDELETEERROR(state, payload) {
      state.profileDelete = payload
    },
    PROFILEDELETEMESSAGE(state, payload) {
      state.profileDeleteMessage = payload
    },
    SAVEUSER(state, payload) {
      state.user = payload
    },
    LOGGEDIN(state, payload) {
      state.loggedIn = payload
    },
    AddNewFeed(state, payload) {

      state.feeds.unshift({ ...payload });



    },
    GETALLFEEDS(state, payload) {
      state.feeds = payload;
    },
    UPDATEUSER(state, payload) {
      state.Artists = state.Artists.filter(artist => artist.id !== payload.id);
      state.Artists.push(payload)
    },
    UPDATEFEEDCOMMENT(state, payload) {
      const index = state.feeds.findIndex(object => {
        return object._id === payload._id;
      });

      state.feeds[index] = payload
      console.log(state.feeds[index].comments)

    },
    UPDATEFEEDLike(state, payload) {
      const index = state.feeds.findIndex(object => {
        return object._id === payload._id;
      });

      state.feeds[index] = payload
    },
  },
  actions: {
    getAllFeeds({ commit }) {
      axios.get("http://localhost:5000/api/feed", {
        headers: {
          "Content-Type": "Application/json"
        }
      }).then(res => {
        console.log(res)
        commit('GETALLFEEDS', res.data);
      })
    },
    signUp({ commit }, payload) {
      axios.post("http://localhost:5000/api/user", payload, {
        headers: {
          "Content-Type": "Application/json"
        }
      })
        .then(response => {
          console.log(response)
          commit('SAVEUSER', response.data)
          commit('LOGGEDIN', true)
          router.push('/acceuil').catch((e) => { console.log(e) })
        }).catch((error) => {
          commit('LOGGINGERROR', true);
          commit('LOGGINGERRORMESSAGE', error.response.data.msg);
        });
    },
    UpdateProfile({ commit }, payload) {

      const formData = new FormData();
      if (payload.file) {
        formData.append('file', payload.file);
      }
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("name", payload.name);
      axios.put(`http://localhost:5000/api/user/${payload.id}`, formData, {
        headers: {
          "Content-Type": "Application/json"
        }
      })
        .then(response => {
          console.log(response.data)
          commit('SAVEUSER', response.data);
          commit('PROFILEUPLOADERROR', true);
          commit('PROFILEUPLOADMESSAGE', "Profile Updated");

          setTimeout(() => {
            commit('PROFILEUPLOADERROR', false);
            commit('PROFILEUPLOADMESSAGE', "");
          }, 2000);

        }).catch((error) => {
          console.log(error)
        });
    },

    DeleteProfile({ commit }, payload) {
      axios.delete(`http://localhost:5000/api/user/${payload}`, {
        headers: {
          "Content-Type": "Application/json"
        }
      })
        .then(response => {
          console.log(response)
          commit('SAVEUSER', {})
          commit('LOGGEDIN', false);
          commit(' PROFILEDELETEERROR', true);
          // commit('LOGGINGERRORMESSAGE', error.response.data.msg);
          router.push('/sign').catch((e) => { console.log(e) })

        }).catch((error) => {

        });
    },

    Login({ commit }, payload) {
      axios.post("http://localhost:5000/api/auth/user", payload, {
        headers: {
          "Content-Type": "Application/json"
        }
      })
        .then(response => {
          console.log(response)
          commit('SAVEUSER', response.data)
          commit('LOGGEDIN', true);



          router.push('/acceuil').catch((e) => { console.log(e) })
        }).catch((error) => {
          commit('LOGGINGERROR', true);
          commit('LOGGINGERRORMESSAGE', error.response.data.msg);


          setTimeout(() => {
            commit('LOGGINGERROR', false);
            commit('LOGGINGERRORMESSAGE', "");
          }, 5000)
        });
    },

    CreateFeed({ commit }, payload) {
      const formData = new FormData();
      formData.append('file', payload.file);
      formData.append("text", payload.text);
      formData.append("addedBy", payload.id);

      axios.post("http://localhost:5000/api/feed", formData, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      })
        .then(response => {
          commit('AddNewFeed', response.data);

        }).catch((error) => {

        });
    },

    likeFeed({ commit }, payload) {
      axios.put(`http://localhost:5000/api/feed/like/${payload.id}`, payload, {
        headers: {
          'content-type': 'application/json',
        }
      }).then((res) => {
        console.log(res);
        commit('UPDATEFEEDLike', res.data);

      })
    },
    LogOut({ commit }) {
      commit('SAVEUSER', {})
      commit('LOGGEDIN', false);
      router.push('/login').catch((e) => { console.log(e) })

    },
    addComment({ commit }, payload) {
      axios.post(`http://localhost:5000/api/feed/comment/${payload.id}`, payload, {
        headers: {
          'content-type': 'application/json',
        }
      }).then(res => {
        console.log(res)
        commit('UPDATEFEEDCOMMENT', res.data);
      })
    },

  },
  modules: {
  }
})
