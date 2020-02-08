<template>
    <section id="container">
        <input type="text" v-model="query" placeholder="Search">
        <select v-model="sortBy">
            <option value="name">A-Z</option>
            <option value="ingredientCount">Ingredient Count</option>
        </select>
        <section class="recipes">
            <article class="recipe" v-for="recipe in sortedRecipes" :key="recipe.id">
                <router-link :to="{ name: 'recipeDetails', params: { slug: recipe.slug } }">
                    <img :src="recipe.imageSrc" :alt="recipe.imageSrc">
                    <h4>{{ recipe.name }}</h4>
                </router-link>
            </article>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    created() {
        this.debouncedGetFilteredRecipes = _.debounce(this.queryRecipes, 250);
        if (this.query) {
            this.queryRecipes(this.query);
        } else {
            this.fetchRecipes();
        }
    },
    watch: {
        query(newQuery, oldQuery) {
            this.debouncedGetFilteredRecipes(newQuery);
        }
    },
    computed: {
        ...mapGetters(['allRecipes', 'sortedRecipes', 'query']),
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
        margin-top: 0;
    }

    img {
        width: 250px;
        margin-bottom: 0;
    }

    .recipes {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .recipe {
        width: 250px;
    }
</style>