import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        content: {
            formula: '',
            writing: 0,
            llis: []
        }

    },
    mutations: {
        updateContent(state, payload) {
            state.content.formula = payload[0];
            state.content.writing = payload[1];
        },
        updateLlis(state, payload){
            state.content.llis.push(payload);
        },
        deleteLlis(state){
            state.content.llis = [];
        }
    }
});
