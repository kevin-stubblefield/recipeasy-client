<template>
    <article>
        <h1>{{ recipe.name }}</h1>
        <p>Servings: {{ recipe.servings }} {{ recipe.servingSize }}</p>
        <section id="ingredients">
            <ul v-if="recipe.ingredientGroups && recipe.ingredientGroups.length > 1">
                <li v-for="ingredientGroup in recipe.ingredientGroups" :key="ingredientGroup.id">
                    <span>{{ ingredientGroup.heading }}</span>

                    <ul>
                        <li v-for="ingredient in ingredientGroup.ingredients" :key="ingredient.id">
                            <span v-if="ingredient.amount">{{ ingredient.amount }} </span>
                            <span v-if="ingredient.unit">{{ ingredient.unit }} </span>
                            <span>{{ ingredient.name }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul v-else-if="recipe.ingredientGroups && recipe.ingredientGroups.length === 1">
                <li v-for="ingredient in recipe.ingredientGroups[0].ingredients" :key="ingredient.id">
                    <span v-if="ingredient.amount">{{ ingredient.amount }} </span> 
                    <span v-if="ingredient.unit">{{ ingredient.unit }} </span> 
                    <span>{{ ingredient.name }}</span>
                </li>
            </ul>
        </section>
        <section id="instructions">
            <ol>
                <li v-for="instruction in recipe.instructions" :key="instruction.id">
                    {{ instruction.description }}
                </li>
            </ol>
        </section>
        <section id="nutrition" v-if="recipe.nutritionInfo && recipe.nutritionInfo.length > 0">
            <span v-for="(nutrition, index) in recipe.nutritionInfo" :key="nutrition.id">
                <span>{{ nutrition.label }} </span>
                <span>{{ nutrition.value }} </span>
                <span>{{ nutrition.unit }}</span>
                <span v-if="index < recipe.nutritionInfo.length - 1"> | </span>
            </span>
        </section>
        <section id="attribution">
            <p>Sourced From: {{ recipe.sourceName }}</p>
            <p>Original Link: <a :href="recipe.sourceUrl">{{ recipe.sourceUrl }}</a></p>
            <p v-if="recipe.author">Author: {{ recipe.author }}</p>
        </section>
    </article>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            recipe: {}
        };
    },
    mounted() {
        axios.get(`http://localhost:3000/${this.$route.params.id}`).then(result => {
            this.recipe = result.data;
        }, error => {
            console.error(error);
        });
    }
}
</script>

<style scoped>

</style>