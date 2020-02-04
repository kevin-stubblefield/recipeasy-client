<template>
    <section id="recipes">
        <input type="text" v-model="query" placeholder="Search">
        <select v-model="sortBy">
            <option value="name">A-Z</option>
            <option value="ingredientCount">Ingredient Count</option>
        </select>
        <article v-for="recipe in sortedRecipes" :key="recipe.id">
            <router-link :to="{ name: 'recipeDetails', params: { id: recipe.id } }">
                <img :src="recipe.imageSrc" :alt="recipe.imageSrc">
                <h3>{{ recipe.name }}</h3>
            </router-link>
        </article>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    created() {
        this.debouncedGetFilteredRecipes = _.debounce(this.queryRecipes, 250);
        this.fetchRecipes();
    },
    watch: {
        query(newQuery, oldQuery) {
            this.debouncedGetFilteredRecipes(newQuery);
        }
    },
    computed: {
        ...mapGetters(['allRecipes', 'sortedRecipes']),
        query: {
            get() {
                return this.$store.state.recipes.query;
            },
            set(value) {
                this.$store.commit('setQuery', value);
            }
        },
        sortBy: {
            get() {
                return this.$store.state.recipes.sortBy;
            },
            set(value) {
                this.$store.commit('setSortBy', value);
            }
        }
    },
    methods: mapActions(['fetchRecipes', 'queryRecipes'])
}
</script>

<style scoped>
    h1, h2, h3, h4, h5 {
        text-transform: uppercase;
        font-weight: 400;
    }
</style>