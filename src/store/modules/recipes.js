import axios from 'axios';

const state = {
    recipes: [],
    query: '',
    sortBy: 'name'
}

const getters = {
    query: state => state.query,
    allRecipes: state => state.recipes,
    sortedRecipes: (state) => {
        return [...state.recipes].sort((a, b) => {
            if (a[state.sortBy] < b[state.sortBy]) return -1;
            if (a[state.sortBy] > b[state.sortBy]) return 1;
            return 0;
        });
    }
};

const actions = {
    async fetchRecipes({ commit }) {
        const response = await axios.get('https://localhost:3000/');

        commit('setRecipes', response.data)
    },
    async queryRecipes({ commit }, query) {
        const response = await axios.get(`http://localhost:3000/search?q=${query}`);

        commit('setRecipes', response.data);
    }
};

const mutations = {
    setRecipes: (state, recipes) => state.recipes = recipes,
    setQuery: (state, query) => state.query = query,
    setSortBy: (state, sortBy) => state.sortBy = sortBy
};

export default {
    state,
    getters,
    actions,
    mutations
};