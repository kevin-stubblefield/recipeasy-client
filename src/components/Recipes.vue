<template>
    <section id="recipes">
        <input type="text" v-model="query" placeholder="Search">
        <select v-model="sortBy">
            <option value="name">A-Z</option>
            <option value="ingredientCount">Ingredient Count</option>
        </select>
        <article v-for="recipe in sortedRecipes" :key="recipe.id">
            <router-link :to="{ name: 'recipeDetails', params: { id: recipe.id } }">{{ recipe.name }}</router-link>
        </article>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            query: '',
            sortBy: 'name'
        };
    },
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
        ...mapGetters(['allRecipes']),
        sortedRecipes() {
            return this.allRecipes.sort((a, b) => {
                if (a[this.sortBy] < b[this.sortBy]) return -1;
                if (a[this.sortBy] > b[this.sortBy]) return 1;
                return 0;
            });
        }
    },
    methods: mapActions(['fetchRecipes', 'queryRecipes'])
}
</script>

<style scoped>

</style>