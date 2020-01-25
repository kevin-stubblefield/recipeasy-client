import axios from 'axios';

const state = {
    recipes: []
}

const getters = {
    allRecipes: state => state.recipes
};

const actions = {
    async fetchRecipes({ commit }) {
        const response = await axios.get('http://localhost:3000/');

        commit('setRecipes', response.data)
    },
    async queryRecipes({ commit }, query) {
        const response = await axios.get(`http://localhost:3000/search?q=${query}`);

        commit('setRecipes', response.data);
    }
};

const mutations = {
    setRecipes: (state, recipes) => state.recipes = recipes
};

export default {
    state,
    getters,
    actions,
    mutations
};